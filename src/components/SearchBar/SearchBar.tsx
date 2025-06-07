import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  action: (formData: FormData) => void;
}

export default function SearchBar({ action }: SearchBarProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = (formData.get("query") as string).trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    action(formData);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        name="query"
        type="text"
        placeholder="Search movies..."
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
