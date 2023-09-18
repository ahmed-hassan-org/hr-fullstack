import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const router = useNavigate();

  const toHome = () => {
    router('/');
  };
  return (
    <div>
      <p>employees</p>
    </div>
  );
};

export default Employees;
