import { Search, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContex";
import { useQuery } from "../context/Query";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { themeColor } = useUser();
  const { setQuery } = useQuery();
  const { outputMethod } = useUser();

  const handleSearch = async () => {
    if (!input.trim()) return;
    setQuery(input);
    if (!outputMethod || outputMethod === "diffScreen") {
      // Redireciona para a página de resultados, enviando os dados
      navigate(`/search?query=${encodeURIComponent(input)}&page=1&pageSize=10`);
    }
  };

  return (
    <div className="panel__search--container">
      <div
        className="panel__search--box"
        style={{ "--theme-color": themeColor } as React.CSSProperties}
      >
        <Search className="icon-container__search-icon" />

        <input
          type="text"
          id="panel__search--bar"
          placeholder="Search for Math Articles"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <SendHorizonal
          className="icon-container__send-icon"
          cursor={"pointer"}
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};
