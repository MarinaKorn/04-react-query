import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  action: (formData: FormData) => void;
}

export default function SearchBar({ action }: SearchBarProps) {
  return (
    <form
      className={css.form}
      action={async (formData: FormData) => {
        const query = (formData.get("query") as string).trim();

        if (!query) {
          toast.error("Please enter your search query.");
          return;
        }

        action(formData);
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
