import { useState,useEffect } from 'react';
import { Button, Space, Table,Popconfirm,message  } from 'antd';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import baseUrl from '../../backend/baseUrl';
import {
DeleteOutlined
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
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Liste"
                        description="Listeden kaldırılsın mı?"
                        onConfirm={() => listAdd(record.id)}
                        okText="Evet"
                        cancelText="Hayır"
                    >
                        <a><DeleteOutlined   style={{color:"red"}} /></a>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        axios.get(baseUrl+'list',{
            headers: {
                'Authorization': 'Bearer '
            }
        }).then((res) => {
            setData(res.data)
        }).catch(e => console.log(e))
    },[refresh])
    const listAdd = (item) => {
        if(item){

            axios.post(baseUrl+`list-delete/${item}`,{
                headers: {
                    Authorization: 'Bearer '
                }
            }).then((res)=>{
                if (item){
                    message.success('Listeden kaldırıldı.');
                    setRefresh([...data],true)
                } else{
                    message.warning('Listeden Kaldırılamadı.');
                }
            }).catch( e => console.log(e))
        }
    }
    return(
        <>
            <div>
                <NavLink to="/urun-ekle"><Button type="primary" style={{ marginBottom:12,float:'right' }} >Yeni Ekle </Button></NavLink>
                <Table columns={columns} dataSource={data} />
            </div>
        </>
    )
}


export default Index;