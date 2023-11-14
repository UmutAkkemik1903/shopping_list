import React from 'react';
import { Tabs } from 'antd';
import Product_list from "./product_list";
import My_list from "./my_list";
const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Ürünler',
        children: <Product_list />,
    },
    {
        key: '2',
        label: 'Listem',
        children:<My_list/>,
    }
];
const Index = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default Index;