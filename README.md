<h1>Alışveriş Listesi Uygulaması</h1>  

<h3>Backend Kurulumu</h3>
<h4>Terminal ekranında:</h4>

    cd backend
    composer install


.env dosyasında veritabanı bilgilerini giriniz.
Bilgilerinizi girdikten sonra terminal ekranında:

    php artisan config:cache
    php artisan key:generate
    php artisan migrate


<h3>Frontend Kurulumu</h3>

<h4>Terminal ekranında:</h4>

    cd frontend
    npm install
    npm start
