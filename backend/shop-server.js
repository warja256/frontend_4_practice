//импорт модулей
const express = require('express'); //для создания сервера
const fs = require('fs'); //для работы с файлами
const path = require('path'); //для работы с путями

const app = express(); //создаем приложение
const port = 8080;
//Указывает Express обслуживать статические файлы из папки
app.use(express.static(path.join(__dirname, '../frontend')));
//маршрут для обработки get-запросов


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/shop.html"));
});

app.get("/products", (req, res) => {
    fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(port, () => {
    console.log('Shop server running at http://localhost:8080');
}); 

app.delete("/products/:id", (req, res) => {
    const productId = req.params.id;

    fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }

        let products = JSON.parse(data);
        const initialLength = products.length;

        products = products.filter(product => product.id !== productId);

        if (products.length === initialLength) {
            res.status(404).send('Product not found');
            return;
        }

        fs.writeFile(path.join(__dirname, '../data/products.json'), JSON.stringify(products, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server Error');
            } else {
                console.log(`Product with ID ${productId} deleted.`);
                res.status(204).send();
            }
        });
    });
});
