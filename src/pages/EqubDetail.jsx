import { File } from "lucide-react";

import { Button } from "../components/ui/button";

import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";

import AllMembers from "../components/tabs/AllMembers";
import Roundes from "../components/tabs/Roundes";
import Active from "../components/tabs/Active";
import EqubLevels from "../components/tabs/EqubLevels";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Transition from "../components/Transition";
import { useTranslation } from "react-i18next";
export default function EqubDetail() {
  const { t } = useTranslation("global");
  const ref = useRef();
  const handlePrint = useReactToPrint({
    content: () => {
      return ref.current;
    },
  });
  return (
    <Transition>
      <main className="flex flex-1 flex-col py-4 md:gap-8 md:p-8">
        <Tabs defaultValue="all">
          <div className="flex flex-wrap items-center">
            <TabsList>
              <TabsTrigger value="all">{t("tabs.members.tabTitle")}</TabsTrigger>
              <TabsTrigger value="equblevels">{t("tabs.equbLevel.tabTitle")}</TabsTrigger>
              <TabsTrigger value="active">{t("tabs.active.tabTitle")}</TabsTrigger>
              <TabsTrigger value="roundes">{t("tabs.roundes.tabTitle")}</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1"
                onClick={handlePrint}
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t("tabs.members.print")}
                </span>
              </Button>
            </div>
          </div>
          <div ref={ref}>
            <div>
              <AllMembers />
            </div>
            <div>
              <EqubLevels />
            </div>
            <div>
              <Roundes />
            </div>

            <div>
              <Active />
            </div>
          </div>
        </Tabs>
      </main>
    </Transition>
  );
}
