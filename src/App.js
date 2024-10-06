import React, { useState } from 'react';
import { Layout, Button, Space, Typography } from 'antd';
import RegistrationForm from './components/RegistrationForm';
import ProfileEditForm from './components/ProfileEditForm';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  return (
    
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#001529', color: '#fff', textAlign: 'center'}}>
        <Title style={{ color: '#fff' }} level={2}>Выберите форму</Title>
      </Header>
      <Content style={{ padding: '50px', textAlign: 'center' }}>
        <Space size="large">
          <Button type="primary" onClick={() => setSelectedForm('registration')}>
            Форма регистрации
          </Button>
          <Button type="primary" onClick={() => setSelectedForm('profileEdit')}>
            Форма редактирования профиля
          </Button>
        </Space>
        <div style={{ marginTop: '30px' }}>
          {selectedForm === 'registration' && <RegistrationForm />}
          {selectedForm === 'profileEdit' && <ProfileEditForm />}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        ©2024 Created with Ant Design
      </Footer>
    </Layout>
  );
};

export default App;
