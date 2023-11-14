import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form, Input,notification } from 'antd';
import axios from "axios";
import {Formik} from "formik";
import * as Yup from "yup";
import baseUrl from '../../backend/baseUrl';
import '../../css/category.css'
function CategoryCreate(props){
    const [api, contextHolder] = notification.useNotification();
    const createCategorySuccess = (type) => {
        api[type]({
            message: 'Kategori',
            description:
                'Kategori eklendi',
        });
    };
    const createCategoryWarning = (type) => {
        api[type]({
            message: 'Kategori',
            description:
                'Kategori eklenemedi',
        });
    };
        const handleSubmit = (values, {resetForm, setSubmitting}) => {
            const data = new FormData();
            data.append('category_name',values.category_name);
            axios.post(baseUrl+'category', data,
                {
                    headers: {
                        'Authorization': 'Bearer'
                    }
                }).then((res) => {
                    resetForm({});
                    setSubmitting(false);
                    createCategorySuccess('success')
            }).catch((err => {
                createCategoryWarning('error')
            }))

        }
    return(
        <>
            <div className="category-create-home">
                <NavLink to='../kategori' className="desit"><i class="bi bi-arrow-90deg-left ccc">Geri Dön</i></NavLink>
                <hr/>
                {contextHolder}
            <div className="category-create">
            
                <Formik
                    initialValues={{
                        category_name:'',
                    }}
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
                        className="category_form_create"
                        label="Kategori Adı"
                        name="category_name"
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