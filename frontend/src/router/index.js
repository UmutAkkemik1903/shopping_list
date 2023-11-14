import Nav from '../components/Nav';
import Dashboard from '../pages/Dashboard';
import Category from '../pages/category';
import CategoryCreate from '../pages/category/create';
import CategoryEdit from '../pages/category/edit';
import Product from '../pages/product';
import List from '../pages/shopping_list';
const routes=
[
    {
        path:'/',
        element:<Nav />,
        children:[
           {
            index:true,
            element:<Dashboard />
           },
           {
            path: 'kategori',
            element:<Category />,
           },
           {
            path: 'kategori-ekle',
            element:<CategoryCreate />
            },
           {
            path: 'kategori-duzenle/:id',
            element:<CategoryEdit />
           },
           {
            path: 'urunler',
            element:<Product />
           },
           {
            path: 'alısveris-listesi',
            element:<List />
           },
        ]
    }
]
export default routes;