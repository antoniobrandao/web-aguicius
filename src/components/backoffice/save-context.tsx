"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { RotateCcw, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SaveState = {
  isDirty: boolean;
  isPending: boolean;
  onSave: (() => void) | null;
  onRevert: (() => void) | null;
};

type SaveContextValue = SaveState & {
  setSaveState: (state: SaveState) => void;
};

const SaveContext = createContext<SaveContextValue | null>(null);

const initialState: SaveState = {
  isDirty: false,
  isPending: false,
  onSave: null,
  onRevert: null,
};

export function BackofficeSaveProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SaveState>(initialState);

  const setSaveState = useCallback((nextState: SaveState) => {
    setState(nextState);
  }, []);

  const value = useMemo(
    () => ({ ...state, setSaveState }),
    [state, setSaveState],
  );

  return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>;
}

export function useBackofficeSave() {
  const context = useContext(SaveContext);
  if (!context) {
    throw new Error(
      "useBackofficeSave must be used within BackofficeSaveProvider.",
    );
  }
  return context;
}

export function BackofficeSaveControls() {
  const { isDirty, isPending, onSave, onRevert } = useBackofficeSave();

  return (
    <div className="flex items-center gap-3">
      <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
        <span
          className={cn(
            "size-2 rounded-full transition-colors",
            isDirty ? "bg-primary" : "bg-muted-foreground/40",
          )}
          aria-hidden
        />
        {isDirty ? "Alterações por gravar" : "Tudo gravado"}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onRevert?.()}
        disabled={isPending || !isDirty || !onRevert}
      >
        <RotateCcw data-icon="inline-start" />
        Reverter
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => onSave?.()}
        disabled={isPending || !isDirty || !onSave}
      >
        <Save data-icon="inline-start" />
        {isPending ? "A gravar..." : "Gravar"}
      </Button>
    </div>
  );
}
