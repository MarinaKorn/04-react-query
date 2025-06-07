import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

interface SearchBarProps {
  action: (formData: FormData) => Promise<void>;
}

export default function SearchBar({ action }: SearchBarProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = (formData.get("query") as string).trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    await action(formData);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Search movies..."
        autoComplete="off"
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
