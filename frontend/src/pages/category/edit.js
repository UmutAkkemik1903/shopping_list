import {Button, Form, Input, notification} from 'antd';
import '../../css/form.css'
import {Formik} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink, useParams} from "react-router-dom";
import {RollbackOutlined} from "@ant-design/icons";
import baseUrl from '../../backend/baseUrl';


const CategoryEdit = (props) => {
    const [api, contextHolder] = notification.useNotification();
    const createCategorySuccess = (type) => {
        api[type]({
            message: 'Kategori',
            description:
                'Kategori düzenlendi.',
        });
    };
    const createCategoryWarning = (type) => {
        api[type]({
            message: 'Kategori',
            description:
                'Kategori düzenlenemedi.',
        });
    };
    let {id} = useParams();
    const [category, setCategory] = useState({});

    useEffect(() => {
        axios.get(baseUrl+`category/${id}`, {
            headers: {
                Authorization: 'Bearer ' + props
            }
        }).then((res) => {
                setCategory(res.data[0])
                console.log(res.data[0])

        }).catch(e => console.log(e));

    }, []);
    const handleSubmit = (values,{ resetForm,setSubmitting }) => {

        const data = new FormData();
        data.append('category_name',values.category_name);

        axios.post(baseUrl+`category-edit/${id}`,data)
            .then((res)=>{
                setSubmitting(false)
                createCategorySuccess('success')
        }).catch(e => createCategoryWarning('error'));
    };
    return (
        <>
            <div className="create-home">
                <NavLink to='../kategori'><RollbackOutlined style={{fontSize:'15px'}} /> <i style={{marginTop:'5px'}}>Geri Dön</i></NavLink>
                <hr/>
                                {contextHolder}
                <div className="create">

                    <Formik
                        initialValues={{
                            category_name:category.category_name
                        }}
                        enableReinitialize
                        onSubmit={handleSubmit}
                        validationSchema={
                            Yup.object().shape({
                                category_name:Yup.string().required('Kategori Adı Zorunludur'),
                            })
                        }
                    >
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              handleBlur,
                              errors,
                              isValid,
                              isSubmitting,
                              setFieldValue,
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
                        style={{
                            padding: '15px',
                            marginRight: '100px'
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                    >

                        <Form.Item
                            className="form_create"
                            label="Kategori Adı"
                            name="asd"
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen kategori adını boş bırakmayın!',
                                },
                            ]}
                        >
                            <Input
                                value={values.category_name}
                                onChange={handleChange('category_name')}
                            />
                            {(errors.category_name && touched.category_name) && <p className="form-error">{errors.category_name}</p>}
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button onClick={handleSubmit} type="primary" htmlType="submit">
                                Düzenle
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

export default CategoryEdit;