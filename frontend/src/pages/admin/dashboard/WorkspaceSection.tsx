import { ArrowRight, TicketCheck, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export function WorkspaceSection() {
  return (
    <section
      className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs sm:p-7"
      aria-labelledby="workspace-heading"
    >
      <div>
        <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-forest">
          Quick Management
        </p>
        <h2 id="workspace-heading" className="mt-2 font-display text-xl font-bold text-slate-900">
          Operations Workspace
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          Access high-priority administrative modules. Staff invitation and delegate directory
          workflows are fully operational.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            to="/admin/users"
            className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-forest/40 hover:bg-emerald-50/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-mineral/10 text-mineral group-hover:bg-mineral group-hover:text-lime transition-colors">
                <UserPlus className="size-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Staff &amp; Roles</p>
                <p className="text-[0.68rem] text-slate-500">Manage permissions</p>
              </div>
            </div>
            <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-1 group-hover:text-forest transition-all" />
          </Link>

          <Link
            to="/admin/delegates"
            className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition-all hover:border-forest/40 hover:bg-emerald-50/30"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-mineral/10 text-mineral group-hover:bg-mineral group-hover:text-lime transition-colors">
                <TicketCheck className="size-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Delegate Directory</p>
                <p className="text-[0.68rem] text-slate-500">View applications</p>
              </div>
            </div>
            <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-1 group-hover:text-forest transition-all" />
          </Link>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4 text-[0.7rem] text-slate-400">
        Additional operational modules (abstract reviewing, enquiries dispatch) will activate as
        their backend services connect.
      </div>
    </section>
  );
}
