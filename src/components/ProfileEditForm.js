import React from 'react';
import { Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Имя обязательно для заполнения'),
  middleName: Yup.string().required('Отчество обязательно для заполнения'),
  lastName: Yup.string().required('Фамилия обязательна для заполнения'),
  birthdate: Yup.string()
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Некорректный формат даты. Используйте ДД.ММ.ГГГГ')
    .nullable(),
  address: Yup.string().nullable(),
});

const ProfileEditForm = () => {
  const formik = useFormik({
    initialValues: { firstName: '', middleName: '', lastName: '', birthdate: '', address: '' },
    validationSchema,
    onSubmit: (values) => {
      console.log('Профиль обновлен:', values);
    },
  });

  return (
    <Form layout="vertical" onFinish={formik.handleSubmit}>
      <Form.Item label="Имя" help={formik.errors.firstName} validateStatus={formik.errors.firstName ? 'error' : ''}>
        <Input
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Отчество" help={formik.errors.middleName} validateStatus={formik.errors.middleName ? 'error' : ''}>
        <Input
          name="middleName"
          value={formik.values.middleName}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Фамилия" help={formik.errors.lastName} validateStatus={formik.errors.lastName ? 'error' : ''}>
        <Input
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item
        label="Дата рождения"
        help={formik.errors.birthdate}
        validateStatus={formik.errors.birthdate ? 'error' : ''}
      >
        <Input
          name="birthdate"
          value={formik.values.birthdate}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Form.Item label="Адрес">
        <Input
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Сохранить
      </Button>
    </Form>
  );
};

export default ProfileEditForm;
