import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (formData: FormData) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  return (
    <form
      className={css.form}
      action={async (formData: FormData) => {
        const query = (formData.get("query") as string).trim();

        if (!query) {
          toast.error("Please enter your search query.");
          return;
        }

        onSubmit(formData);
      }}
    >
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
