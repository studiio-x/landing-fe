import { Close, Pencil, Plus } from "@/assets/icons";
import { PATHS } from "@/constants/common/paths";
import { useRouter } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GlassButton from "../../common/GlassButton";

interface CreateButtonProps {
  isCreateOpen: boolean;
  onClick: () => void;
}

const CreateButton = ({ isCreateOpen, onClick }: CreateButtonProps) => {
  const router = useRouter();
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-col gap-[0.75rem] w-full">
      <AnimatePresence>
        {isCreateOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 12 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden Body_2_semibold text-grey-50"
            >
              <GlassButton
                onClick={() => router.push(PATHS.DASHBOARD_CREATE)}
                className="w-full bg-[rgba(255,48,48,0.45)] rounded-[0.25rem] hover:bg-[rgba(255,48,48,0.75)] Body_2_semibold flex gap-[0.62rem]"
              >
                <Plus className="w-[1.5rem] h-[1.5rem] [&_path]:fill-White" />
                <span>{t("sidebar.newProject")}</span>
              </GlassButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
              className="overflow-hidden Body_2_semibold text-grey-50 flex gap-[1.125rem]"
            >
              <GlassButton
                onClick={() => router.push(PATHS.DASHBOARD_CONTINUE)}
                className="w-full"
              >
                <Pencil className="w-[1.125rem]" />
                {t("sidebar.continueProject")}
              </GlassButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex justify-center w-full">
        <motion.button
          type="button"
          onClick={onClick}
          aria-label={isCreateOpen ? "close button" : "create button"}
          animate={{
            width: isCreateOpen ? "3.125rem" : "100%",
            borderRadius: isCreateOpen ? "6.25rem" : "0.25rem",
            backgroundColor: isCreateOpen
              ? "#282C34"
              : "rgba(255, 48, 48, 0.45)",
          }}
          whileHover={
            !isCreateOpen
              ? { backgroundColor: "rgba(255, 48, 48, 0.75)" }
              : undefined
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`relative flex items-center justify-center h-[3.0625rem] ${
            isCreateOpen
              ? "shadow-[0_1px_8px_0_rgba(18,18,18,0.12)]"
              : "Body_1_semibold"
          }`}
        >
          {!isCreateOpen && (
            <div
              className="absolute inset-0 rounded-[inherit] pointer-events-none"
              style={{
                border: "0.9px solid transparent",
                backgroundImage: `
                  radial-gradient(120% 120% at 0% 0%, rgba(255,255,255,0.36), rgba(255,255,255,0.00) 55%),
                  radial-gradient(120% 120% at 100% 0%, rgba(255,255,255,0.36), rgba(255,255,255,0.00) 55%),
                  radial-gradient(120% 120% at 100% 100%, rgba(255,255,255,0.36), rgba(255,255,255,0.00) 55%),
                  radial-gradient(120% 120% at 0% 100%, rgba(255,255,255,0.36), rgba(255,255,255,0.00) 55%)
                `,
                backgroundOrigin: "border-box",
                backgroundClip: "border-box",
                WebkitMask:
                  "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
          )}
          <AnimatePresence mode="wait">
            {isCreateOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className=" bg-Grey-700"
              >
                <Close color="white" className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="plus"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex gap-[0.62rem] items-center"
              >
                <Plus className="w-[1.5rem] h-[1.5rem] [&_path]:fill-White" />
                <span className="Body_1_semibold">
                  {t("sidebar.createButton")}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};
export default CreateButton;
