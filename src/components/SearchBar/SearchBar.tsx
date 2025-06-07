import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  action: (formData: FormData) => Promise<void>;
}

export default function SearchBar({ action }: SearchBarProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = (formData.get("query") as string).trim();

    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }

    await action(formData);
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search movies..."
      />
      <button className={css.button} type="submit">
        Search
      </button>
    </form>
  );
}
