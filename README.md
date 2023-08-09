### Hexlet tests and linter status:
[![Actions Status](https://github.com/tracktor-git/frontend-project-12/workflows/hexlet-check/badge.svg)](https://github.com/tracktor-git/frontend-project-12/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/dfdb4278d40e1476e649/maintainability)](https://codeclimate.com/github/tracktor-git/frontend-project-12/maintainability)

[Hexlet Chat](https://localhost:3000) – очень упрощённый аналог мессенджера Slack. (Ссылка временно недоступна)

### Демонстрация проекта
Перейдите по [ссылке](https://localhost:3000) (Ссылка временно недоступна)

Общение разделено на каналы. Каждый канал — это отдельный чат, где пользователи могут общаться друг с другом. Слева находится список доступных каналов, к которым можно присоединиться. Также, можно создать свой канал. По умолчанию вы автоматически добавлены в канал #general. Это общий канал для общения всех пользователей.

## Поддержка браузеров
![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

## Установка проекта для разработчиков
1. Клонируйте репозиторий:
```sh 
git clone https://github.com/tracktor-git/frontend-project-12
```

2. Установите приложение, используя следующие команды:

Находясь в корневой папке проекта, установите необходимые зависимости:

```sh
make install
```

Для установки зависимостей frontend-части приложения, перейдите в папку frontend:

```sh
cd ./frontend
```

Затем выполните установку зависимостей фронтенда:

```sh
make install
```

Запуск приложения локально.

Сначала запустите иртуальный сервер бэкенда (находясь в корневой папке проекта):

```sh
npm start
```

Затем перейдите в папку frontend и запустите frontend-часть приложения:

```sh
cd ./frontend
npm start
```
