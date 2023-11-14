import React, {useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form, Input,notification,Select } from 'antd';
import axios from "axios";
import {Formik} from "formik";
import * as Yup from "yup";
import baseUrl from '../../backend/baseUrl';
import '../../css/form.css'
function CategoryCreate(props){
    const { Option } = Select;
    const [searchText, setSearchText] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const [category,setCategory] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const createProductSuccess = (type) => {
        api[type]({
            message: 'Ürün',
            description:
                'Ürün eklendi',
        });
    };
    const createProductWarning = (type) => {
        api[type]({
            message: 'Ürün',
            description:
                'Ürün eklenemedi',
        });
    };
    useEffect(()=>{
        axios.get(baseUrl+'category',{
            headers:{
                'Authorization':'Bearer'
            }
        }).then((res)=>{
            setCategory(res.data)
        }).catch(e=>console.log(e))
    },[refresh])
    const handleSearch = (value) => {
        setSearchText(value);
    };

    const filterOptions = (inputValue, option) => {
        if (option && option.children) {
            return option.children.toLowerCase().includes(inputValue.toLowerCase());
        }
        return false;
    };
        const handleSubmit = (values, {resetForm, setSubmitting}) => {
            const data = new FormData();
            data.append('product_name',values.product_name);
            data.append('category_id',values.category_id);
            data.append('price',values.price);
            axios.post(baseUrl+'product', data,
                {
                    headers: {
                        'Authorization': 'Bearer'
                    }
                }).then((res) => {
                    resetForm({});
                    setSubmitting(false);
                    createProductSuccess('success')
            }).catch((err => {
                createProductWarning('error')
            }))

        }
    return(
        <>
            <div className="create-home">
                <NavLink to='../urunler' className="desit"><i class="bi bi-arrow-90deg-left ccc">Geri Dön</i></NavLink>
                <hr/>
                {contextHolder}
            <div className="create">
            
                <Formik
                    initialValues={{
                        product_name:'',
                        category_id:'',
                        price:'',
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={
                        Yup.object().shape({
                            product_name:Yup.string().required('Ürün Adı Zorunludur'),
                            price:Yup.number().required('Ürün Adı Zorunludur'),
                        })
                    }
                >
                    {({
                          setFieldValue,
                          values,
                          handleChange,
                          handleSubmit,
                          errors,
                          touched
                      }) => (
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        className="form_create"
                        label="Kategoriye Ekle"
                        name="category_name"
                    >
                        <Select
                            style={{minWidth:'400px'}}
                            placeholder="Kategori seçin"
                            showSearch
                            filterOption={filterOptions}
                            onSearch={handleSearch}
                            value={values.category_id}
                            onChange={value => setFieldValue('category_id', value)}
                        >
                            {category.map((option) => (
                                <Option key={option.id} value={option.id}>
                                    {option.category_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        className="form_create"
                        label="Ürün Adı"
                        name="product_name"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen ürün adını boş bırakmayın!',
                            },
                        ]}
                    >
                        <Input
                            value={values.product_name}
                            onChange={handleChange('product_name')}
                        />
                        {(errors.product_name && touched.product_name) && <p className="form-error">{errors.product_name}</p>}
                    </Form.Item>
                    <Form.Item
                        className="form_create"
                        label="Ürün Fiyatı"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen fiyat alanını boş bırakmayın!',
                            },
                        ]}
                    >
                        <Input
                            type='number'
                            value={values.price}
                            onChange={handleChange('price')}
                        />
                        {(errors.price && touched.price) && <p className="form-error">{errors.price}</p>}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button
                            onClick={handleSubmit}
                            type="primary"
                            htmlType="submit">
                            Ekle
                        </Button>
                    </Form.Item>
                </Form>
                    )}
                </Formik>
            </div>
            </div>
        </>
    )
}
export default CategoryCreate;