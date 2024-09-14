import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import API from "../api/axios";
import Transition from "../components/Transition";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import Equbs from "../components/tables/Equbs";

export default function ListEqubes() {
  const { t } = useTranslation("global");
  const [equbs, setEqubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEqubs = () => {
    setIsLoading(true);
    API.get("/equb-type/member")
      .then((data) => {
        setIsLoading(false);
        setEqubs(data.data.data.map(item => item.equbType));
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getEqubs();
  }, []);

  return (
    <Transition>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>{t("ListEqubes.title")}</CardTitle>
          <CardDescription>{t("ListEqubes.des")}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="mx-auto h-4 w-4 animate-spin" />
          ) : (
            equbs ? <Equbs equbs={equbs} getEqubs={getEqubs} /> : <Card>
              <p>No record</p>
            </Card>
          )}
        </CardContent>
        <CardFooter>
          {equbs && (
            <div className="text-xs text-muted-foreground">
              {equbs.length} {t("ListEqubes.table.numberOfequbes")}
            </div>
          )}
        </CardFooter>
      </Card>
    </Transition>
  );
}
