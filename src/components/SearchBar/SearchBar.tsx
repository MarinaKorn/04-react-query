import type { FormEvent } from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBoxProps {
  onSubmit: (query: string) => void;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ onSubmit, value, onChange }: SearchBoxProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = (formData.get('query') as string).trim();

    if (!query) {
      toast.error('Please enter a search query!');
      return;
    }
    onSubmit(query);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search notes"
      />
      <button type="submit" className={css.button}>Search</button>
    </form>
  );
}
