Чтобы запустить проект нужно установить зависимости - `npm ci` и включить webpack сервер - `npm start`.

В проекте используются:  antd, react-router, redux-saga. Для пагинации используется url параметр `page`, нумерация начинается с 0 как в запросах к API, так же количество элементов на странице можно задать через `pageSize`. Перед отправкой запроса к дилерам saga сначала проверяет наличие нужных дилеров в redux хранилище, если все необходимые дилеры есть запрос не отправляется.