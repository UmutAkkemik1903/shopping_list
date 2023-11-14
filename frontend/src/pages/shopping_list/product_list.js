import { useState,useEffect } from 'react';
import { Button, Space, Table,Popconfirm,message  } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import baseUrl from '../../backend/baseUrl';
import {
    CheckOutlined
} from '@ant-design/icons';
function Index(){
    const columns = [
        {
            title: 'Ürün Adı',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Ürün Fiyatı',
            dataIndex: 'price',
            key: 'price',
            render:(_,record) => (<p>{record.price}₺</p>)
        },
        {
            title: 'Kategori Adı',
            dataIndex: 'category_name',
            key: 'category_name',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Liste"
                        description="Listeye eklensin mi?"
                        onConfirm={() => listAdd(record.id)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <a><CheckOutlined   style={{color:"green"}} /></a>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        axios.get(baseUrl+'product',{
            headers: {
                'Authorization': 'Bearer '
            }
        }).then((res) => {
            setData(res.data)
        }).catch(e => console.log(e))
    },[refresh])
    const listAdd = (item) => {
        if(item){

            axios.post(baseUrl+`list/${item}`,{
                headers: {
                    Authorization: 'Bearer '
                }
            }).then((res)=>{
                if (item){
                    message.success('Listeye eklendi.');
                    setRefresh([...data],true)
                } else{
                    message.warning('listeye eklenemedi.');
                }
            }).catch( e => console.log(e))
        }
    }
    return(
        <>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
        </>
    )
}


export default Index;