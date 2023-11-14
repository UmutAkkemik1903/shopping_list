import React, { useEffect, useState } from 'react';
import { Button, Form, Input, notification } from 'antd';
import '../../css/form.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';
import { RollbackOutlined } from '@ant-design/icons';
import baseUrl from '../../backend/baseUrl';

const CategoryEdit = (props) => {
    const [api, contextHolder] = notification.useNotification();
    const createProductSuccess = (type) => {
        api[type]({
            message: 'Kategori',
            description: 'Ürün düzenlendi.',
        });
    };
    const createProductWarning = (type) => {
        api[type]({
            message: 'Kategori',
            description: 'Ürün düzenlenemedi.',
        });
    };
    let { id } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios
            .get(baseUrl + `product/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + props,
                },
            })
            .then((res) => {
                setProduct(res.data[0]);
            })
            .catch((e) => console.log(e));
    }, [id, props]);

    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        const data = new FormData();
        data.append('product_name', values.product_name);
        data.append('price', values.price);

        axios
            .post(baseUrl + `product-edit/${id}`, data)
            .then((res) => {
                setSubmitting(false);
                createProductSuccess('success');
            })
            .catch((e) => createProductWarning('error'));
    };

    return (
        <>
            <div className="create-home">
                <NavLink to="../urunler">
                    <RollbackOutlined style={{ fontSize: '15px' }} />{' '}
                    <i style={{ marginTop: '5px' }}>Geri Dön</i>
                </NavLink>
                <hr />
                {contextHolder}
                <div className="create">
                    <Formik
                        initialValues={{
                            product_name: product.product_name,
                            price: product.price,
                        }}
                        enableReinitialize
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object().shape({
                            product_name: Yup.string().required('Ürün Adı Zorunludur'),
                            price: Yup.number().required('Ürün Fiyatı Zorunludur'),
                        })}
                    >
                        {({
                              values,
                              handleChange,
                              handleSubmit,
                              errors,
                              isValid,
                              isSubmitting,
                              touched,
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
                                    marginRight: '100px',
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                autoComplete="off"
                            >
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
                                    {errors.product_name && touched.product_name && (
                                        <p className="form-error">{errors.product_name}</p>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    className="form_create"
                                    label="Ürün Fiyatı"
                                    name="price"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Lütfen ürün fiyatını boş bırakmayın!',
                                        },
                                    ]}
                                >
                                    <Input
                                        value={values.price}
                                        onChange={handleChange('price')}
                                    />
                                    {errors.price && touched.price && (
                                        <p className="form-error">{errors.price}</p>
                                    )}
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
                                        htmlType="submit"
                                    >
                                        Düzenle
                                    </Button>
                                </Form.Item>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default CategoryEdit;
