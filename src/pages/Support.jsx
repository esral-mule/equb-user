import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Transition from "../components/Transition";
import { useToast } from "../components/ui/use-toast";
import { useTranslation } from "react-i18next";

export default function Support() {
  const form = useRef();
  const { toast } = useToast();
  const { t } = useTranslation("global");

  const [formData, setFormData] = useState({
    from_name: "",
    user_name: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let formErrors = {};

    if (!formData.user_name) {
      formErrors.user_name = t("support.nameReq");
    }

    if (!formData.from_name) {
      formErrors.from_name = t("support.emilReq");
    } else if (!/\S+@\S+\.\S+/.test(formData.from_name)) {
      formErrors.from_name = t("support.emailInvalid");
    }

    if (!formData.message) {
      formErrors.message = t("support.messageReq");
    }

    return formErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);
      emailjs
        .sendForm(
          "service_tirfu78",
          "template_8bmo1e7",
          form.current,
          "VW4wdWE-aTFNYn3Qs"
        )
        .then(
          () => {
            setIsLoading(false);
            toast({
              title: t("support.toastTitle"),
              description: t("support.toastSuccess"),
            });
          },
          () => {
            setIsLoading(false);
            toast({
              title: t("support.toastTitle"),
              description: t("support.toastError"),
            });
          }
        );
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Transition>
      <form ref={form} onSubmit={sendEmail} className="max-w-lg mx-auto mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1 text-left">
              <Label htmlFor="user_name">{t("support.name")}</Label>
              {errors.user_name && (
                <p className="text-red-500 text-sm">{errors.user_name}</p>
              )}
              <Input
                id="user_name"
                type="text"
                placeholder="Your name"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-1 text-left">
              <Label htmlFor="from_name" className="w-16">
              {t("support.email")}
              </Label>
              {errors.from_name && (
                <p className="text-red-500 text-sm">{errors.from_name}</p>
              )}
              <Input
                id="from_name"
                type="email"
                placeholder="Your email"
                name="from_name"
                value={formData.from_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-1 text-left">
              <Label htmlFor="message" className="w-16">
              {t("support.message")}
              </Label>
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
              <Textarea
                id="message"
                name="message"
                placeholder="Type your message here..."
                className="min-h-12 min-w-full p-3 focus-visible:ring-0"
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="m-1" disabled={isLoading}>
                {isLoading ? t("support.loading") : t("support.btnName")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Transition>
  );
}
