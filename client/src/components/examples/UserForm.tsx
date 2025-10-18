import UserForm from '../UserForm';

export default function UserFormExample() {
  return <UserForm onSubmit={(data) => console.log('Form data:', data)} />;
}
