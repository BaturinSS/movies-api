require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { limiter } = require('./utils/limiterConfig');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handlingErrors = require('./middlewares/handlingErrors');

const { PORT, DATA_BASE,NODE_ENV } = require('./utils/constants');

const app = express();

mongoose.connect(DATA_BASE);

app.options('*', cors);

app.use(requestLogger);
app.use(cors);
if (NODE_ENV === 'production') app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handlingErrors);

app.listen(PORT);
