const express = require('express'); // для создания сервера
const fs = require('fs'); // для работы с файлами
const path = require('path'); // для работы с путями

const app = express(); // создаём приложение
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/admin.html"));
});

app.get("/products", (req, res) => {
    fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            res.status(500).send('Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    console.log(`Запрос на получение продукта с ID: ${productId}`);

    fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            res.status(500).send('Server Error');
            return;
        }

        let products;
        try {
            products = JSON.parse(data);
        } catch (parseError) {
            console.error('Ошибка при парсинге данных:', parseError);
            res.status(500).send('Error parsing JSON');
            return;
        }

        const product = products.find(product => product.id.toString() === productId);
        if (!product) {
            console.log(`Продукт с ID ${productId} не найден`);
            res.status(404).send('Product not found');
            return;
        }

        console.log(`Продукт найден: ${JSON.stringify(product)}`);
        res.json(product);
    });
});

// Добавление товара
app.post("/products", (req, res) => {
    fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            res.status(500).send('Server Error');
            return;
        }

        const products = JSON.parse(data);
        const newProduct = {
            id: (products.length + 1).toString(),
            ...req.body
        };
        products.push(newProduct);

        fs.writeFile(path.join(__dirname, '../data/products.json'), JSON.stringify(products, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Ошибка при записи в файл:', err);
                res.status(500).send('Server Error');
            } else {
                res.status(201).json(newProduct);
            }
        });
    });
});

// Удаление товара
app.delete("/products/:id", (req, res) => {
    const productIdToDelete = req.params.id;
    console.log(`Запрос на удаление продукта с ID: ${productIdToDelete}`);

    fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            res.status(500).send('Server Error');
            return;
        }

        let products = JSON.parse(data);
        const productIndex = products.findIndex(product => product.id === productIdToDelete);

        if (productIndex === -1) {
            console.log(`Продукт с ID ${productIdToDelete} не найден`);
            res.status(404).send('Product not found');
            return;
        }

        // Удаляем товар из массива
        products.splice(productIndex, 1);

        // Записываем обновленный список товаров обратно в файл
        fs.writeFile(path.join(__dirname, '../data/products.json'), JSON.stringify(products, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Ошибка при записи в файл:', err);
                res.status(500).send('Server Error');
            } else {
                console.log(`Продукт с ID ${productIdToDelete} успешно удален`);
                res.status(200).send('Product deleted');
            }
        });
    });
});

// Редактирование товара
app.put("/products/:id", (req, res) => {
    const productIdToEdit = req.params.id;
    console.log(`Запрос на редактирование продукта с ID: ${productIdToEdit}`);

    fs.readFile(path.join(__dirname, '../data/products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            res.status(500).send('Server Error');
            return;
        }

        let products;
        try {
            products = JSON.parse(data);
        } catch (parseError) {
            console.error('Ошибка при парсинге данных:', parseError);
            res.status(500).send('Error parsing JSON');
            return;
        }

        const productIndex = products.findIndex(product => product.id === productIdToEdit);

        if (productIndex === -1) {
            console.log(`Продукт с ID ${productIdToEdit} не найден`);
            res.status(404).send('Product not found');
            return;
        }

        // Обновляем данные товара
        const updatedProduct = {
            id: productIdToEdit,
            ...req.body // Обновляем только те поля, которые пришли в запросе
        };

        products[productIndex] = updatedProduct;

        // Записываем обновленные данные обратно в файл
        fs.writeFile(path.join(__dirname, '../data/products.json'), JSON.stringify(products, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Ошибка при записи в файл:', err);
                res.status(500).send('Server Error');
            } else {
                console.log(`Продукт с ID ${productIdToEdit} успешно обновлен`);
                res.json(updatedProduct); // Отправляем обновленные данные
            }
        });
    });
});


// Получение товара по ID
app.get("/products/:id", (req, res) => {
    const productId = req.params.id;
    console.log(`Запрос на получение продукта с ID: ${productId}`);

    fs.readFile(path.join(__dirname, 'data/products.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            res.status(500).send('Server Error');
            return;
        }

        let products;
        try {
            products = JSON.parse(data);
        } catch (parseError) {
            console.error('Ошибка при парсинге данных:', parseError);
            res.status(500).send('Error parsing JSON');
            return;
        }

        const product = products.find(product => product.id === productId);
        
        if (!product) {
            console.log(`Продукт с ID ${productId} не найден`);
            res.status(404).send('Product not found');
            return;
        }

        console.log(`Продукт найден: ${JSON.stringify(product)}`);
        res.json(product);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
