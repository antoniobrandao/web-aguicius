"use client";

import { Fragment, useMemo, useState, useTransition, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  deleteLocationAction,
  deleteServiceAction,
  saveLocationAction,
  saveNavigationSection,
  savePageAction,
  saveServiceAction,
  saveWebsiteSection,
  uploadServiceImage,
} from "@/app/backoffice/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTENT_ICON_KEYS, PAGE_KEYS, SERVICE_TIERS } from "@/lib/content/constants";
import type { WebsiteContent } from "@/lib/content/website-schema";
import { getImageDimensions, type ImageDimensions } from "@/lib/utils/image";

import { Field, RemoveButton, SectionCard, TextareaField, TextField } from "./fields";

type WebsiteEditorValue = Pick<WebsiteContent, "site" | "values">;
type WebsiteService = WebsiteContent["services"][number];
type WebsiteLocation = WebsiteContent["locations"][number];
type PageKey = (typeof PAGE_KEYS)[number];
type SaveResult<T> = { ok: true; data: T } | { ok: false; error?: string };

const pageLabels: Record<PageKey, string> = {
  home: "Home",
  about: "Sobre Nós",
  services: "Serviços",
  contact: "Contactos",
  quote: "Orçamento",
  terms: "Termos",
  privacy: "Privacidade",
};

export function LocalSaveBar({
  isDirty,
  isPending,
  onSave,
  onRevert,
  onDelete,
}: {
  isDirty: boolean;
  isPending: boolean;
  onSave: () => void;
  onRevert: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="sticky top-16 z-10 flex items-center justify-between gap-3 rounded-lg border bg-background/95 p-3 shadow-sm backdrop-blur">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className={isDirty ? "size-2 rounded-full bg-primary" : "size-2 rounded-full bg-muted-foreground/40"} />
        {isDirty ? "Alterações por gravar" : "Tudo gravado"}
      </div>
      <div className="flex items-center gap-2">
        {onDelete ? (
          <Button type="button" variant="destructive" size="sm" onClick={onDelete} disabled={isPending}>
            Apagar
          </Button>
        ) : null}
        <Button type="button" variant="outline" size="sm" onClick={onRevert} disabled={!isDirty || isPending}>
          Reverter
        </Button>
        <Button type="button" size="sm" onClick={onSave} disabled={!isDirty || isPending}>
          {isPending ? "A gravar..." : "Gravar"}
        </Button>
      </div>
    </div>
  );
}

function useDocumentEditor<T>(initialValue: T, saveAction: (value: T) => Promise<SaveResult<T>>) {
  const [value, setValue] = useState(initialValue);
  const [savedValue, setSavedValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const [isPending, startTransition] = useTransition();

  function update(nextValue: T) {
    setValue(nextValue);
    setIsDirty(true);
  }

  function save(afterSave?: (value: T) => void) {
    startTransition(async () => {
      const result = await saveAction(value);
      if (!result.ok) {
        toast.error("Não foi possível gravar", {
          description: result.error ?? "Erro desconhecido.",
        });
        return;
      }
      setSavedValue(result.data);
      setValue(result.data);
      setIsDirty(false);
      afterSave?.(result.data);
      toast.success("Documento gravado.");
    });
  }

  function revert() {
    setValue(savedValue);
    setIsDirty(false);
    toast.message("Alterações revertidas.");
  }

  return { value, update, save, revert, isDirty, isPending };
}

export function WebsiteEditor({ initialValue }: { initialValue: WebsiteEditorValue }) {
  const editor = useDocumentEditor(initialValue, async (value) => {
    const result = await saveWebsiteSection(value);
    return result.ok
      ? { ok: true, data: value }
      : { ok: false, error: result.error };
  });
  const { site, values } = editor.value;

  function updateSite(nextSite: WebsiteContent["site"]) {
    editor.update({ ...editor.value, site: nextSite });
  }

  return (
    <div className="grid gap-6">
      <LocalSaveBar
        isDirty={editor.isDirty}
        isPending={editor.isPending}
        onSave={() => editor.save()}
        onRevert={editor.revert}
      />
      <SectionCard title="Website" description="Identidade, contactos e metadata global.">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Nome" value={site.name} onChange={(name) => updateSite({ ...site, name })} />
          <TextField label="Tagline" value={site.tagline} onChange={(tagline) => updateSite({ ...site, tagline })} />
          <TextField label="Telefone" value={site.phone} onChange={(phone) => updateSite({ ...site, phone })} />
          <TextField label="Telefone href" value={site.phoneHref} onChange={(phoneHref) => updateSite({ ...site, phoneHref })} />
          <TextField label="Email" value={site.email} onChange={(email) => updateSite({ ...site, email })} />
          <TextField label="WhatsApp" value={site.whatsapp} onChange={(whatsapp) => updateSite({ ...site, whatsapp })} />
          <TextField label="App URL" value={site.appUrl} onChange={(appUrl) => updateSite({ ...site, appUrl })} />
        </div>
        <TextareaField label="Descrição" value={site.description} onChange={(description) => updateSite({ ...site, description })} />
      </SectionCard>
      <SectionCard title="Horário">
        <ListEditor
          items={site.schedule}
          addLabel="Adicionar horário"
          createItem={() => ({ days: "Dias", hours: "Horário" })}
          onChange={(schedule) => updateSite({ ...site, schedule })}
          renderItem={(item, index, onItemChange, remove) => (
            <div className="grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_1fr_auto]">
              <TextField label="Dias" value={item.days} onChange={(days) => onItemChange({ ...item, days })} />
              <TextField label="Horas" value={item.hours} onChange={(hours) => onItemChange({ ...item, hours })} />
              <div className="flex items-end">
                <RemoveButton onClick={remove} />
              </div>
            </div>
          )}
        />
      </SectionCard>
      <SectionCard title="Social e SEO">
        <div className="grid gap-4 md:grid-cols-3">
          <TextField label="Facebook" value={site.social.facebook} onChange={(facebook) => updateSite({ ...site, social: { ...site.social, facebook } })} />
          <TextField label="Instagram" value={site.social.instagram} onChange={(instagram) => updateSite({ ...site, social: { ...site.social, instagram } })} />
          <TextField label="YouTube" value={site.social.youtube} onChange={(youtube) => updateSite({ ...site, social: { ...site.social, youtube } })} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Metadata base" value={site.seo.metadataBase} onChange={(metadataBase) => updateSite({ ...site, seo: { ...site.seo, metadataBase } })} />
          <TextField label="Título default" value={site.seo.defaultTitle} onChange={(defaultTitle) => updateSite({ ...site, seo: { ...site.seo, defaultTitle } })} />
          <TextField label="Template título" value={site.seo.titleTemplate} onChange={(titleTemplate) => updateSite({ ...site, seo: { ...site.seo, titleTemplate } })} />
          <TextField label="Descrição default" value={site.seo.defaultDescription} onChange={(defaultDescription) => updateSite({ ...site, seo: { ...site.seo, defaultDescription } })} />
        </div>
      </SectionCard>
      <SectionCard title="Valores da empresa">
        <ListEditor
          items={values}
          addLabel="Adicionar valor"
          createItem={() => ({ slug: "novo-valor", title: "Novo valor", description: "Descrição." })}
          onChange={(nextValues) => editor.update({ ...editor.value, values: nextValues })}
          renderItem={(value, index, onItemChange, remove) => (
            <div className="grid gap-3 rounded-lg border p-4">
              <div className="grid gap-3 md:grid-cols-2">
                <TextField label="Slug" value={value.slug} onChange={(slug) => onItemChange({ ...value, slug })} />
                <TextField label="Título" value={value.title} onChange={(title) => onItemChange({ ...value, title })} />
              </div>
              <TextareaField label="Descrição" value={value.description} onChange={(description) => onItemChange({ ...value, description })} />
              <div><RemoveButton onClick={remove} /></div>
            </div>
          )}
        />
      </SectionCard>
    </div>
  );
}

export function NavigationEditor({ initialValue }: { initialValue: WebsiteContent["navigation"] }) {
  const editor = useDocumentEditor(initialValue, async (value) => {
    const result = await saveNavigationSection(value);
    return result.ok ? { ok: true, data: value } : { ok: false, error: result.error };
  });

  return (
    <div className="grid gap-6">
      <LocalSaveBar
        isDirty={editor.isDirty}
        isPending={editor.isPending}
        onSave={() => editor.save()}
        onRevert={editor.revert}
      />
      <SectionCard title="Header">
        <LinkListEditor
          links={editor.value.header}
          allowCta
          onChange={(header) => editor.update({ ...editor.value, header })}
        />
      </SectionCard>
      <SectionCard title="Footer">
        <LinkListEditor
          links={editor.value.footerCompany}
          onChange={(footerCompany) => editor.update({ ...editor.value, footerCompany })}
        />
      </SectionCard>
    </div>
  );
}

export function ServiceDocumentEditor({
  initialService,
}: {
  initialService: WebsiteService;
}) {
  const router = useRouter();
  const originalSlug = initialService.slug;
  const editor = useDocumentEditor(initialService, async (service) => {
    const result = await saveServiceAction({ originalSlug, service });
    return result.ok
      ? { ok: true, data: result.data ?? service }
      : { ok: false, error: result.error };
  });

  function deleteDocument() {
    if (!confirm("Apagar este serviço?")) return;
    void deleteServiceAction(originalSlug).then((result) => {
      if (!result.ok) {
        toast.error("Não foi possível apagar", { description: result.error });
        return;
      }
      toast.success("Serviço apagado.");
      router.push("/backoffice/services");
      router.refresh();
    });
  }

  const service = editor.value;

  return (
    <div className="grid gap-6">
      <LocalSaveBar
        isDirty={editor.isDirty}
        isPending={editor.isPending}
        onSave={() => editor.save((saved) => {
          if (saved.slug !== originalSlug) router.replace(`/backoffice/services/${saved.slug}`);
          router.refresh();
        })}
        onRevert={editor.revert}
        onDelete={deleteDocument}
      />
      <SectionCard title="Serviço">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Slug" value={service.slug} onChange={(slug) => editor.update({ ...service, slug })} />
          <TextField label="Título" value={service.title} onChange={(title) => editor.update({ ...service, title })} />
          <NativeSelect label="Ícone" value={service.icon} options={CONTENT_ICON_KEYS} onChange={(icon) => editor.update({ ...service, icon })} />
          <NativeSelect label="Tier" value={service.tier} options={SERVICE_TIERS} onChange={(tier) => editor.update({ ...service, tier })} />
        </div>
        <TextareaField label="Resumo" value={service.short} onChange={(short) => editor.update({ ...service, short })} />
        <TextareaField label="Descrição" rows={7} value={service.description} onChange={(description) => editor.update({ ...service, description })} />
        <StringListEditor label="Bullets" items={service.bullets ?? []} onChange={(bullets) => editor.update({ ...service, bullets })} />
        <ServiceImageUploader
          slug={service.slug}
          image={service.image}
          onChange={(image) => editor.update({ ...service, image })}
        />
      </SectionCard>
    </div>
  );
}

export function LocationDocumentEditor({
  initialLocation,
}: {
  initialLocation: WebsiteLocation;
}) {
  const router = useRouter();
  const originalSlug = initialLocation.slug;
  const editor = useDocumentEditor(initialLocation, async (location) => {
    const result = await saveLocationAction({ originalSlug, location });
    return result.ok
      ? { ok: true, data: result.data ?? location }
      : { ok: false, error: result.error };
  });

  function deleteDocument() {
    if (!confirm("Apagar esta localização?")) return;
    void deleteLocationAction(originalSlug).then((result) => {
      if (!result.ok) {
        toast.error("Não foi possível apagar", { description: result.error });
        return;
      }
      toast.success("Localização apagada.");
      router.push("/backoffice/locations");
      router.refresh();
    });
  }

  const location = editor.value;

  return (
    <div className="grid gap-6">
      <LocalSaveBar
        isDirty={editor.isDirty}
        isPending={editor.isPending}
        onSave={() => editor.save((saved) => {
          if (saved.slug !== originalSlug) router.replace(`/backoffice/locations/${saved.slug}`);
          router.refresh();
        })}
        onRevert={editor.revert}
        onDelete={deleteDocument}
      />
      <SectionCard title="Localização">
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Slug" value={location.slug} onChange={(slug) => editor.update({ ...location, slug })} />
          <TextField label="Cidade" value={location.city} onChange={(city) => editor.update({ ...location, city })} />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="size-4"
            checked={Boolean(location.primary)}
            onChange={(event) => editor.update({ ...location, primary: event.target.checked })}
          />
          Localização principal
        </label>
        <StringListEditor label="Linhas de morada" items={location.lines} onChange={(lines) => editor.update({ ...location, lines })} />
        <TextField label="URL de pesquisa" value={location.mapsSearchUrl ?? ""} onChange={(mapsSearchUrl) => editor.update({ ...location, mapsSearchUrl })} />
        <TextField label="URL embed" value={location.mapEmbedUrl ?? ""} onChange={(mapEmbedUrl) => editor.update({ ...location, mapEmbedUrl })} />
      </SectionCard>
    </div>
  );
}

export function PageDocumentEditor<K extends PageKey>({
  pageKey,
  initialPage,
}: {
  pageKey: K;
  initialPage: WebsiteContent["pages"][K];
}) {
  const editor = useDocumentEditor(initialPage, async (page) => {
    const result = await savePageAction(pageKey, page as WebsiteContent["pages"][typeof pageKey]);
    return result.ok ? { ok: true, data: page } : { ok: false, error: result.error };
  });
  const [json, setJson] = useState(() => JSON.stringify(editor.value, null, 2));

  const jsonError = useMemo(() => {
    try {
      JSON.parse(json);
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : "JSON inválido";
    }
  }, [json]);

  function applyJson(nextJson: string) {
    setJson(nextJson);
    try {
      editor.update(JSON.parse(nextJson));
    } catch {
      // Keep invalid JSON in the textarea until the user fixes it.
    }
  }

  return (
    <div className="grid gap-6">
      <LocalSaveBar
        isDirty={editor.isDirty}
        isPending={editor.isPending}
        onSave={() => editor.save()}
        onRevert={() => {
          editor.revert();
          setJson(JSON.stringify(initialPage, null, 2));
        }}
      />
      <SectionCard
        title={pageLabels[pageKey]}
        description="Este ecrã grava apenas o documento desta página."
      >
        <Field label="Conteúdo da página">
          <Textarea
            value={json}
            rows={28}
            className="font-mono text-xs"
            onChange={(event) => applyJson(event.target.value)}
            aria-invalid={Boolean(jsonError)}
          />
        </Field>
        {jsonError ? <p className="text-sm text-destructive">{jsonError}</p> : null}
      </SectionCard>
    </div>
  );
}

function LinkListEditor<T extends { label: string; href: string; cta?: boolean }>({
  links,
  onChange,
  allowCta = false,
}: {
  links: T[];
  onChange: (links: T[]) => void;
  allowCta?: boolean;
}) {
  return (
    <ListEditor
      items={links}
      addLabel="Adicionar link"
      createItem={() => ({ label: "Novo link", href: "/" }) as T}
      onChange={onChange}
      renderItem={(link, index, onItemChange, remove) => (
        <div className="grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_1fr_auto_auto]">
          <TextField label="Label" value={link.label} onChange={(label) => onItemChange({ ...link, label })} />
          <TextField label="Href" value={link.href} onChange={(href) => onItemChange({ ...link, href })} />
          {allowCta ? (
            <label className="flex items-end gap-2 pb-2 text-sm">
              <input
                type="checkbox"
                className="size-4"
                checked={Boolean(link.cta)}
                onChange={(event) => onItemChange({ ...link, cta: event.target.checked })}
              />
              CTA
            </label>
          ) : null}
          <div className="flex items-end">
            <RemoveButton onClick={remove} />
          </div>
        </div>
      )}
    />
  );
}

function StringListEditor({
  label,
  items,
  onChange,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}) {
  return (
    <Field label={label}>
      <div className="grid gap-2">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={item}
              onChange={(event) =>
                onChange(items.map((current, itemIndex) => itemIndex === index ? event.target.value : current))
              }
            />
            <RemoveButton onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} />
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, ""])}>
          Adicionar
        </Button>
      </div>
    </Field>
  );
}

function NativeSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="h-9 rounded-md border bg-transparent px-3 text-sm"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

function ListEditor<T>({
  items,
  onChange,
  createItem,
  addLabel,
  renderItem,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  addLabel: string;
  renderItem: (item: T, index: number, onItemChange: (item: T) => void, remove: () => void) => React.ReactNode;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <Fragment key={index}>
          {renderItem(
            item,
            index,
            (nextItem) => onChange(items.map((current, itemIndex) => itemIndex === index ? nextItem : current)),
            () => onChange(items.filter((_, itemIndex) => itemIndex !== index)),
          )}
        </Fragment>
      ))}
      <Button type="button" variant="outline" onClick={() => onChange([...items, createItem()])}>
        {addLabel}
      </Button>
    </div>
  );
}

function ServiceImageUploader({
  slug,
  image,
  onChange,
}: {
  slug: string;
  image: WebsiteService["image"];
  onChange: (image: NonNullable<WebsiteService["image"]>) => void;
}) {
  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const dimensions: Partial<ImageDimensions> = await getImageDimensions(file).catch(() => ({}));
    const formData = new FormData();
    formData.set("slug", slug);
    formData.set("alt", image?.alt ?? `${slug} Aguicius`);
    formData.set("file", file);
    if (dimensions.width) formData.set("width", String(dimensions.width));
    if (dimensions.height) formData.set("height", String(dimensions.height));

    const result = await uploadServiceImage(formData);
    if (!result.ok) {
      toast.error("Upload falhou", { description: result.error });
      return;
    }

    onChange({
      assetId: result.data.assetId,
      pathname: result.data.pathname,
      alt: image?.alt ?? `${slug} Aguicius`,
      width: result.data.width,
      height: result.data.height,
    });
    toast.success("Imagem carregada. Grave o serviço para persistir a referência.");
  }

  return (
    <div className="grid gap-3 rounded-lg border p-4">
      <Label>Imagem</Label>
      <TextField label="Alt" value={image?.alt ?? ""} onChange={(alt) => onChange({ ...(image ?? {}), alt })} />
      {image?.pathname ? <p className="text-xs text-muted-foreground">Atual: {image.pathname}</p> : null}
      <Input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}
