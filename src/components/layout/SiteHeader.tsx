import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ActionLink } from "@/components/common/ActionButton";
import { activeEvent, activeEventNotice } from "@/data/event";
import { navigation } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-emerald transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
          scrolled || open
            ? "border-b border-white/12 bg-mineral/88 shadow-[0_12px_40px_oklch(0.12_0.03_157/.28)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-20 items-center justify-between gap-5 xl:h-24">
          <Link
            to="/"
            aria-label={`${activeEvent.name} home`}
            style={{
              clipPath: "polygon(0 0, calc(100% - 0.7rem) 0, 100% 0.7rem, 100% 100%, 0 100%)",
            }}
          >
            <img
              src="/brand/aiaiac.png"
              alt="AIAIAC — Asset Integrity, Artificial Intelligence, Automation and Cybersecurity"
              className="h-50 w-50 object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                // end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "link-underline inline-flex min-h-11 min-w-11 items-center justify-center text-[0.62rem] font-semibold uppercase tracking-[0.12em] transition-colors",
                    isActive ? "text-emerald" : "text-white/76 hover:text-white",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ActionLink to="/registration" size="sm" className="hidden sm:inline-flex">
              Register
            </ActionLink>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] border border-white/28 xl:hidden"
            >
              <span
                className={cn(
                  "block h-px w-5 bg-white transition-transform duration-300",
                  open && "translate-y-[3.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-5 bg-white transition-transform duration-300",
                  open && "-translate-y-[3.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-mineral pt-20 xl:hidden"
          >
            <div className="grid-lines absolute inset-0 opacity-35" aria-hidden />
            <nav className="shell relative flex h-full flex-col justify-between overflow-y-auto pb-10">
              <ul className="mt-6 grid sm:grid-cols-2 sm:gap-x-10">
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.045, duration: 0.5 }}
                    className="border-b border-white/10"
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex min-h-16 items-center font-display text-2xl font-extrabold uppercase tracking-[-0.02em]",
                          isActive ? "text-emerald" : "text-white",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="space-y-5 pt-8">
                <p className="font-mono text-[0.65rem] uppercase leading-relaxed tracking-[0.18em] text-emerald">
                  {activeEvent.edition} · {activeEventNotice}
                </p>
                <ActionLink to="/registration" size="lg" className="w-full">
                  Registration options
                </ActionLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
