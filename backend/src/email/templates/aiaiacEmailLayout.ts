/** Email-safe presentation shared by AIAIAC transactional messages. */

export function escapeEmailHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

export function emailInformationRows(
  rows: readonly (readonly [label: string, value: string])[],
): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#f5f7f4;border:1px solid #dce4dc">${rows
    .map(
      ([label, value]) =>
        `<tr><th scope="row" align="left" valign="top" style="padding:10px 14px;border-bottom:1px solid #dce4dc;color:#405a4c;font-size:13px;font-weight:600;width:38%">${escapeEmailHtml(label)}</th><td valign="top" style="padding:10px 14px;border-bottom:1px solid #dce4dc;color:#05190f;font-size:14px;word-break:break-word">${escapeEmailHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;
}

export function aiaiacEmailLayout(input: {
  title: string;
  preview: string;
  bodyHtml: string;
  footerText?: string;
}): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeEmailHtml(input.title)}</title></head><body style="margin:0;padding:0;background:#eef1ec;color:#05190f;font-family:Arial,Helvetica,sans-serif"><div style="display:none;font-size:1px;line-height:1px;color:#eef1ec;max-height:0;max-width:0;opacity:0;overflow:hidden">${escapeEmailHtml(input.preview)}</div><table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;background:#eef1ec"><tr><td align="center" style="padding:24px 12px"><table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:100%;max-width:600px;border-collapse:collapse;background:#ffffff"><tr><td style="padding:28px 32px;background:#05190f;color:#ffffff"><p style="margin:0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#b8d0bf">Conference &amp; Innovation Showcase</p><p style="margin:9px 0 0;font-size:27px;line-height:1.2;font-weight:700">AIAIAC Africa 2027</p><p style="margin:10px 0 0;font-size:12px;line-height:1.5;color:#d7e3da">Asset Integrity, Artificial Intelligence,<br>Automation &amp; Cybersecurity</p></td></tr><tr><td style="padding:30px 32px;font-size:15px;line-height:1.6">${input.bodyHtml}</td></tr><tr><td style="padding:22px 32px;background:#f5f7f4;border-top:1px solid #dce4dc;color:#405a4c;font-size:12px;line-height:1.6"><strong style="color:#05190f">AIAIAC Africa 2027</strong><br>22–23 June 2027 · Lagos, Nigeria<br>${escapeEmailHtml(input.footerText ?? "This is an automated transactional email.")}</td></tr></table></td></tr></table></body></html>`;
}
