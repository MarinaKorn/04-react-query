import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleAction = async (formData: FormData) => {
    const query = (formData.get('query') as string).trim();

    if (!query) {
      toast.error('Please enter a search query!');
      return;
    }

    onSubmit(query);
  };

  return (
    <form className={css.form} action={handleAction}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search movies"
      />
      <button type="submit" className={css.button}>Search</button>
    </form>
  );
}