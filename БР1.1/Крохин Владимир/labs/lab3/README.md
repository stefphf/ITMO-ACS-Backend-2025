# Микросервисная архитектура для системы учета тренировок стрелков

## Описание проекта

Система предназначена для учета тренировок стрелков, включая свободные и квалификационные тренировки, серии, выстрелы и заметки. Система построена на микросервисной архитектуре с использованием Node.js, Express, TypeScript и PostgreSQL.

## Микросервисы

### API Gateway

- Маршрутизация запросов к соответствующим микросервисам
- Единая точка входа для клиентов
- Реализован на Nginx
- Порт: 80

### Auth Service (Сервис аутентификации)

- Регистрация и аутентификация пользователей
- Управление пользователями
- Проверка JWT токенов
- Порт: 8001
- База данных: PostgreSQL (authdb)

### Training Service (Сервис тренировок)

- Управление свободными и квалификационными тренировками
- Управление сериями и выстрелами
- Управление спортсменами и тренерами
- Порт: 8002
- База данных: PostgreSQL (trainingdb)

### Reference Service (Сервис справочных данных)

- Управление мишенями
- Управление типами оружия
- Управление упражнениями
- Порт: 8003
- База данных: PostgreSQL (referencedb)

### Notes Service (Сервис заметок)

- Управление заметками к тренировкам
- Управление заметками к сериям
- Порт: 8004
- База данных: PostgreSQL (notesdb)


## Запуск проекта

### Предварительные требования

- Docker и Docker Compose
- Node.js и npm (для разработки)

### Шаги для запуска

1. Клонировать репозиторий:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Создать файлы .env для каждого сервиса в соответствующих директориях (auth-service, training-service, reference-service, notes-service)

3. Установить зависимости и собрать контейнеры:

```bash
# Установка зависимостей
npm install

# Сборка контейнеров
docker-compose build

# Запуск проекта
docker-compose up -d
```

4. Проверить работоспособность:

- API Gateway: http://localhost:80
- Swagger UI для Auth Service: http://localhost:80/api-docs/auth
- Swagger UI для Training Service: http://localhost:80/api-docs/training
- Swagger UI для Reference Service: http://localhost:80/api-docs/reference
- Swagger UI для Notes Service: http://localhost:80/api-docs/notes
- Prometheus: http://localhost:80/prometheus
- Grafana: http://localhost:80/grafana (логин: admin, пароль: admin)

## Структура проекта

```
.
├── api-gateway/
│   ├── Dockerfile
│   └── nginx.conf
├── auth-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   └── ...
│   ├── Dockerfile
│   └── ...
├── training-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   └── ...
│   ├── Dockerfile
│   └── ...
├── reference-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   └── ...
│   ├── Dockerfile
│   └── ...
├── notes-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   └── ...
│   ├── Dockerfile
│   └── ...
├── prometheus/
│   └── prometheus.yml
├── monitoring/
│   └── grafana/
│       ├── dashboards/
│       └── provisioning/
├── docker-compose.yml
├── package.json
├── package-lock.json
├── .prettierrc
├── .prettierignore
├── eslint.config.mjs
└── README.md
```

## API Endpoints

### Auth Service

- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/change-password` - Изменение пароля
- `POST /api/auth/validate-token` - Проверка токена
- `GET /api/users` - Получение списка пользователей
- `GET /api/users/:id` - Получение пользователя по ID
- `POST /api/users` - Создание пользователя
- `PATCH /api/users/:id` - Обновление пользователя
- `DELETE /api/users/:id` - Удаление пользователя
- `GET /api/users/me` - Получение данных текущего пользователя

### Training Service

- `GET /api/free-trainings` - Получение списка свободных тренировок
- `GET /api/free-trainings/:id` - Получение свободной тренировки по ID
- `POST /api/free-trainings` - Создание свободной тренировки
- `PATCH /api/free-trainings/:id` - Обновление свободной тренировки
- `DELETE /api/free-trainings/:id` - Удаление свободной тренировки
- `GET /api/qualification-trainings` - Получение списка квалификационных тренировок
- `GET /api/qualification-trainings/:id` - Получение квалификационной тренировки по ID
- `POST /api/qualification-trainings` - Создание квалификационной тренировки
- `PATCH /api/qualification-trainings/:id` - Обновление квалификационной тренировки
- `DELETE /api/qualification-trainings/:id` - Удаление квалификационной тренировки
- `GET /api/series/:id` - Получение серии по ID
- `POST /api/series` - Создание серии
- `PATCH /api/series/:id` - Обновление серии
- `DELETE /api/series/:id` - Удаление серии
- `GET /api/shots/:id` - Получение выстрела по ID
- `POST /api/shots` - Создание выстрела
- `PATCH /api/shots/:id` - Обновление выстрела
- `DELETE /api/shots/:id` - Удаление выстрела
- `GET /api/athletes` - Получение списка спортсменов
- `GET /api/athletes/:id` - Получение спортсмена по ID
- `POST /api/athletes` - Создание спортсмена
- `PATCH /api/athletes/:id` - Обновление спортсмена
- `DELETE /api/athletes/:id` - Удаление спортсмена
- `GET /api/coaches` - Получение списка тренеров
- `GET /api/coaches/:id` - Получение тренера по ID
- `POST /api/coaches` - Создание тренера
- `PATCH /api/coaches/:id` - Обновление тренера
- `DELETE /api/coaches/:id` - Удаление тренера

### Reference Service

- `GET /api/targets` - Получение списка мишеней
- `GET /api/targets/:id` - Получение мишени по ID
- `POST /api/targets` - Создание мишени
- `PATCH /api/targets/:id` - Обновление мишени
- `DELETE /api/targets/:id` - Удаление мишени
- `GET /api/weapon-types` - Получение списка типов оружия
- `GET /api/weapon-types/:id` - Получение типа оружия по ID
- `POST /api/weapon-types` - Создание типа оружия
- `PATCH /api/weapon-types/:id` - Обновление типа оружия
- `DELETE /api/weapon-types/:id` - Удаление типа оружия
- `GET /api/exercises` - Получение списка упражнений
- `GET /api/exercises/:id` - Получение упражнения по ID
- `POST /api/exercises` - Создание упражнения
- `PATCH /api/exercises/:id` - Обновление упражнения
- `DELETE /api/exercises/:id` - Удаление упражнения

### Notes Service

- `GET /api/notes` - Получение списка заметок
- `GET /api/notes/:id` - Получение заметки по ID
- `POST /api/notes` - Создание заметки
- `PATCH /api/notes/:id` - Обновление заметки
- `DELETE /api/notes/:id` - Удаление заметки
- `GET /api/training-notes` - Получение списка заметок к тренировкам
- `GET /api/training-notes/:id` - Получение заметки к тренировке по ID
- `POST /api/training-notes` - Создание заметки к тренировке
- `DELETE /api/training-notes/:id` - Удаление заметки к тренировке
- `GET /api/series-notes` - Получение списка заметок к сериям
- `GET /api/series-notes/:id` - Получение заметки к серии по ID
- `POST /api/series-notes` - Создание заметки к серии
- `DELETE /api/series-notes/:id` - Удаление заметки к серии
