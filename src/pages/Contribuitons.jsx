import { CircleCheckBig, CircleX } from "lucide-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import API from "../api/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Contribuitons() {
  const { id } = useParams();
  const { t } = useTranslation("global");
  const [contribuitons, setContribuitons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getEqubs = () => {
    setIsLoading(true);
    API.get(`/member/equb-types/${id}/contributions`)
      .then((data) => {
        setIsLoading(false);
        setContribuitons(data.data.data);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getEqubs();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("contribution.title")}</CardTitle>
        <CardDescription>{t("contribution.des")}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div>
            <Loader2 className="mx-auto h-4 w-4 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">
                  {t("contribution.round")}
                </TableHead>
                <TableHead className="text-center">
                  {t("contribution.equbLeveltitle")}
                </TableHead>
                <TableHead className="text-center">
                  {t("contribution.equbLevelContribution")}
                </TableHead>
                <TableHead className="text-center">
                  {t("contribution.paymentStatus")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {contribuitons.map((contribuiton) => (
                <TableRow key={contribuiton._id}>
                  <TableCell>{contribuiton.round.round}</TableCell>
                  <TableCell>{contribuiton.member.equbLevel.title}</TableCell>
                  <TableCell className="text-center">
                    {contribuiton.member.equbLevel.contribution}
                  </TableCell>
                  <TableCell>
                    {contribuiton.isPaid}

                    <div
                      className="flex justify-center"
                      style={{
                        color: !contribuiton.isPaid ? "#b91c1c" : "#166534",
                      }}
                    >
                      {contribuiton.isPaid ? (
                        <div className="flex justify-center gap-1">
                          <CircleCheckBig className="mx-auto" size={20} />
                          <p className="sm:flex">{t("contribution.paid")}</p>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-1">
                          <CircleX size={20} />
                          <p className="flex">{t("contribution.unpaid")}</p>
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <CardFooter>
        {contribuitons && (
          <div className="text-xs text-muted-foreground">
            {contribuitons.length} {t("contribution.contributions")}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
