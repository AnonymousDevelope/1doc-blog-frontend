"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  teamSize: string;
  profession: string;
  country: string;
  message: string;
};

export default function ContactForm() {
  const t = useTranslations();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    teamSize: "",
    profession: "",
    country: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("contact.name_error");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.email_error_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("contact.email_error_format");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("contact.phone_error_required");
    } else if (!/^\+?[0-9\s-]{9,15}$/.test(formData.phone)) {
      newErrors.phone = t("contact.phone_error_format");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.message_error");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      toast.error(t("contact.toast_error_title"), {
        description: t("contact.toast_error_description"),
        icon: <XCircle className="text-red-500" />,
        position: "bottom-right",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(t("contact.toast_success_title"), {
        description: t("contact.toast_success_description"),
        icon: <CheckCircle className="text-green-500" />,
      });
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        teamSize: "",
        profession: "",
        country: "",
        message: "",
      });
    } catch {
      toast.error(t("contact.toast_error_title"), {
        description: t("contact.toast_error_description"),
        icon: <XCircle className="text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="fullName">{t("contact.name")} *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">{t("contact.email")} *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">{t("contact.phone")} *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <Label htmlFor="company">{t("contact.company")}</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Team Size */}
          <div>
            <Label htmlFor="teamSize">{t("contact.team_size")}</Label>
            <Select
              value={formData.teamSize}
              onValueChange={(value) => handleInputChange("teamSize", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("contact.team_size_placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10</SelectItem>
                <SelectItem value="11-50">11-50</SelectItem>
                <SelectItem value="51-200">51-200</SelectItem>
                <SelectItem value="201-500">201-500</SelectItem>
                <SelectItem value="500+">500+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Profession */}
          <div>
            <Label htmlFor="profession">{t("contact.profession")}</Label>
            <Input
              id="profession"
              value={formData.profession}
              onChange={(e) => handleInputChange("profession", e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Country */}
          <div>
            <Label htmlFor="country">{t("contact.country")}</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* Message (full width) */}
      <div>
        <Label htmlFor="message">{t("contact.message")} *</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          disabled={isSubmitting}
          rows={5}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("contact.submitting") : t("contact.submit")}
      </Button>
    </form>
  );
}