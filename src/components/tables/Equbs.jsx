import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function Equbs({ equbs, getEqubs }) {
  const { t } = useTranslation("global");
  let navigate = useNavigate();
  const handleSelect = (id) => {
    navigate(`/equbdetail/${id}`);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">
            {t("ListEqubes.table.name")}
          </TableHead>
          <TableHead className="text-center">
            {t("ListEqubes.table.contribution")}
          </TableHead>
          <TableHead className="text-center">
            {t("ListEqubes.table.maxUniqueIds")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equbs.map((equb) => (
          <TableRow
            key={equb._id}
            onClick={() => {
              handleSelect(equb._id);
            }}
          >
            <TableCell>{capitalizeFirstLetter(equb.name)}</TableCell>
            <TableCell className="text-center">{equb.contribution}</TableCell>
            <TableCell>{equb.maxUniqueIds}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
