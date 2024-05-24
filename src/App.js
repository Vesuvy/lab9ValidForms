import './App.css';
import React, { useState, useEffect } from 'react';

const CitySelector = () => {
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div>
      <select onChange={(e) => setSelectedCity(e.target.value)}>
        <option value="">Выберите город</option>
        <option value="Москва">Москва</option>
        <option value="Санкт-Петербург">Санкт-Петербург</option>
        <option value="Рио">Рио-де-Жанейро</option>
        <option value="Нью-Йорк">Нью-Йорк</option>
      </select>
      {selectedCity && selectedCity !== 'Рио' && (
        <p>Нет, это не Рио-де-Жанейро!</p>
      )}
    </div>
  );
};

const Calculator = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    let res;

    switch (operation) {
      case '+':
        res = n1 + n2;
        break;
      case '-':
        res = n1 - n2;
        break;
      case '*':
        res = n1 * n2;
        break;
      case '/':
        res = n1 / n2;
        break;
      default:
        res = 'Ошибка';
    }
    setResult(`${n1} ${operation} ${n2} = ${res}`);
  };

  return (
    <div>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <select onChange={(e) => setOperation(e.target.value)} value={operation}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />
      <button onClick={calculate}>Рассчитать</button>
      {result && <p>{result}</p>}
    </div>
  );
};

const BaseConverter = () => {
  const [number, setNumber] = useState('');
  const [base, setBase] = useState('10');
  const [convertedNumber, setConvertedNumber] = useState('');

  const convertNumber = () => {
    let result;
    try {
      result = parseInt(number, base).toString(10);
    } catch (error) {
      result = 'Ошибка';
    }
    setConvertedNumber(result);
  };

  return (
    <div>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <select onChange={(e) => setBase(e.target.value)} value={base}>
        <option value="2">2</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="16">16</option>
      </select>
      <button onClick={convertNumber}>Преобразовать</button>
      {convertedNumber && <p>Результат: {convertedNumber}</p>}
    </div>
  );
};

const AgeCalculator = () => {
  const [birthdate, setBirthdate] = useState('');
  const [secondsLived, setSecondsLived] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (birthdate) {
        const birthDateObj = new Date(birthdate);
        const now = new Date();
        const diffInSeconds = Math.floor((now - birthDateObj) / 1000);
        setSecondsLived(diffInSeconds);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdate]);

  return (
    <div>
      <input
        type="date"
        value={birthdate}
        onChange={(e) => setBirthdate(e.target.value)}
      />
      {birthdate && <p>Вы прожили: {secondsLived} секунд.</p>}
    </div>
  );
};

const NumberList = () => {
  const [number, setNumber] = useState('');
  const [numbers, setNumbers] = useState([1, 13, 6, 52, 4, 14]);
  const [filter, setFilter] = useState('Все');

  const addNumber = () => {
    if (number !== '') {
      setNumbers([...numbers, parseInt(number)]);
      setNumber('');
    }
  };

  const filteredNumbers = numbers.filter((num) => {
    if (filter === 'Четные') return num % 2 === 0;
    if (filter === 'Нечетные') return num % 2 !== 0;
    return true;
  });

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={addNumber}>Добавить</button>
      <div>
        <button onClick={() => setFilter('Все')}>Все</button>
        <button onClick={() => setFilter('Четные')}>Четные</button>
        <button onClick={() => setFilter('Нечетные')}>Нечетные</button>
      </div>
      <ul>
        {filteredNumbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
};

// Валидация формы регистрации
const RegistrationForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleRegistration = () => {
    // Проверка логина
    if (!login || login.length < 6 || login.length > 20 || !/^[a-zA-Z0-9]+$/.test(login)) {
      setLoginError('Логин должен содержать от 6 до 20 символов и состоять из латинских букв и цифр.');
      return;
    } else {
      setLoginError('');
    }

    // Проверка пароля
    if (!password) {
      setPasswordError('Пароль обязателен.');
      return;
    } else {
      setPasswordError('');
    }

    // Проверка совпадения пароля и его подтверждения
    if (password !== confirmPassword) {
      setConfirmPasswordError('Пароли не совпадают.');
      return;
    } else {
      setConfirmPasswordError('');
    }

    // Если все проверки пройдены, можно выполнять регистрацию
    // Реализация регистрации...
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      {loginError && <p className="error">{loginError}</p>}
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {passwordError && <p className="error">{passwordError}</p>}
      <input
        type="password"
        placeholder="Повторите пароль"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
      <button onClick={handleRegistration}>Зарегистрироваться</button>
    </div>
  );
};

const ProfileEditForm = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Проверка наличия имени
    if (!firstName.trim()) {
      errors.firstName = 'Имя обязательно для заполнения';
    }

    // Проверка наличия отчества
    if (!middleName.trim()) {
      errors.middleName = 'Отчество обязательно для заполнения';
    }

    // Проверка наличия фамилии
    if (!lastName.trim()) {
      errors.lastName = 'Фамилия обязательна для заполнения';
    }

    // Проверка формата даты рождения (если введена)
    if (birthdate.trim() && !/^\d{2}\.\d{2}\.\d{4}$/.test(birthdate)) {
      errors.birthdate = 'Некорректный формат даты. Используйте ДД.ММ.ГГГГ';
    }

    setErrors(errors);

    // Если ошибок нет, можно отправить форму
    if (Object.keys(errors).length === 0) {
      // Отправка данных формы...
    }
  };

  return (
    <div>
      <h2>Форма редактирования профиля</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div>
          <label>Отчество:</label>
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
          {errors.middleName && <p className="error">{errors.middleName}</p>}
        </div>
        <div>
          <label>Фамилия:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
        <div>
          <label>Дата рождения:</label>
          <input
            type="text"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          {errors.birthdate && <p className="error">{errors.birthdate}</p>}
        </div>
        <div>
          <label>Адрес:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <h1>City Selector</h1>
      <CitySelector />
      <h1>Calculator</h1>
      <Calculator />
      <h1>Base Converter</h1>
      <BaseConverter />
      <h1>Age Calculator</h1>
      <AgeCalculator />
      <h1>Number List with Filter</h1>
      <NumberList />
      <h1>Валидация формы</h1>
      <RegistrationForm />
      <h1>Валидация формы редактиварония</h1>
      <ProfileEditForm />
    </div>
  );
};



export default App;
