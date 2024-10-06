import React from 'react';
import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  login: Yup.string()
    .min(6, 'Логин должен содержать не менее 6 символов')
    .max(20, 'Логин должен содержать не более 20 символов')
    .matches(/^[a-zA-Z0-9]+$/, 'Логин должен содержать только латинские буквы и цифры')
    .required('Логин обязателен'),
  password: Yup.string().required('Пароль обязателен'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно'),
});

const RegistrationForm = () => {
  const formik = useFormik({
    initialValues: { login: '', password: '', confirmPassword: '' },
    validationSchema,
    onSubmit: (values) => {
      console.log('Регистрация успешна:', values);
    },
  });

  return (
    <Form layout="vertical" onFinish={formik.handleSubmit}>
      <Form.Item label="Логин" help={formik.errors.login} validateStatus={formik.errors.login ? 'error' : ''}>
        <Input
          name="login"
          value={formik.values.login}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Пароль" help={formik.errors.password} validateStatus={formik.errors.password ? 'error' : ''}>
        <Input.Password
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item
        label="Подтвердите пароль"
        help={formik.errors.confirmPassword}
        validateStatus={formik.errors.confirmPassword ? 'error' : ''}
      >
        <Input.Password
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default RegistrationForm;
