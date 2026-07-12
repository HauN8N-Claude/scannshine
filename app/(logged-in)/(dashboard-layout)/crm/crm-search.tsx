"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

export const CrmSearch = () => {
  const [search, setSearch] = useQueryState(
    "recherche",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: false, throttleMs: 500 }),
  );

  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon>
        <Search className="size-4" aria-hidden />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Rechercher un nom, numéro, email..."
        value={search}
        onChange={async (event) => setSearch(event.target.value)}
      />
    </InputGroup>
  );
};
