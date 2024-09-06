

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import * as React from "react"


import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function LangToggle() {
  const [t, i18n] = useTranslation("global")

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="small">
          {/* <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
          <Globe strokeWidth={1.75} />
          {/* <span className="sr-only">Toggle theme</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleChangeLanguage("en")}>
          En
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeLanguage("tig")}>
          Tig
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeLanguage("am")}>
          Am
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
