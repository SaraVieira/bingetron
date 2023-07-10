import { Combobox } from "@headlessui/react";
import axios from "axios";
import { debounce } from "lodash-es";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";

export default function Home() {
  const [results, setResults] = useState([]);
  const [selectedShow, setSelectedShow] = useState();
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onChange = async (value) => {
    const data = await axios.get(`/api/search?query=${value}`);
    setResults(data.data);
  };

  const debouncedChangeHandler = debounce(onChange, 200);

  const selectShow = async (id) => {
    setLoading(true)
    const {data} = await axios.get(`/api/random?id=${id}`);

    router.push(`show/${id}/${data.season}/${data.episode}#e-${data.episode}`)
  }

  return (
    <main className={`bg-blue h-screen flex items-center py-5 flex-col ${value ? "justify-start" : "justify-center"}  transition duration-500`}>
      <Combobox value={selectedShow} onChange={setSelectedShow}>
        <Combobox.Input
          className={`rounded-2xl ${value ? "bg-white" : "bg-transparent"}  border border-green p-4 w-[90%] max-w-md placeholder:text-green font-bold text-center ${value ? "text-blue" : "text-green"} transition duration-500`}
          placeholder="Search for a show"
          onChange={(event) => {
            const v = event.target.value;
            setValue(v);
            debouncedChangeHandler(v)
          }}
        />
        <Combobox.Options className="mt-5  w-[90%] max-w-md">
          {results.map((show) => (
            <Combobox.Option onClick={() => selectShow(show.id)} className="p-5 flex justify-between text-darkBlue m-auto bg-green mb-[1px] rounded-sm" key={show.id} value={show.id}>
              <span className="font-bold">{show.name}</span>
              {show.year}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </main>
  );
}
