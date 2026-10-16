(function (global) {
  "use strict";
  global.GombePageModules = global.GombePageModules || {};
  global.GombePageModules.settings = function renderSettings(context) {
    const { esc, icon, localBadge, pageHeader, state } = context;
    const s = state.settings;
    return (
      pageHeader(
        "Workspace configuration",
        "Settings & privacy",
        "Configure prototype contact details, response targets and privacy-minded defaults. None of these settings connect to the public website.",
        localBadge(),
      ) +
      '<div class="info-callout">' +
      icon("lock", 15) +
      "<span><strong>Frontend-only notice:</strong> updates are local to this browser. Production contact changes, retention rules, access policies and notification routes require review and deployment in authorised systems.</span></div>" +
      '<form id="settingsForm" data-form="settings-save"><div class="settings-grid"><div><section class="card settings-card"><h2>Public contact snapshot</h2><p>Reference details represented on the Ministry website.</p><div class="form-grid"><div class="field span-2"><label for="settingMinistry">Ministry name</label><input id="settingMinistry" name="ministryName" value="' +
      esc(s.ministryName) +
      '"></div><div class="field span-2"><label for="settingAddress">Office address</label><input id="settingAddress" name="officeAddress" value="' +
      esc(s.officeAddress) +
      '"></div><div class="field"><label for="settingPhone">Public telephone</label><input id="settingPhone" name="phone" value="' +
      esc(s.phone) +
      '"></div><div class="field"><label for="settingHotline">Environmental hotline</label><input id="settingHotline" name="hotline" value="' +
      esc(s.hotline) +
      '"></div><div class="field"><label for="settingEmail">Public email</label><input id="settingEmail" name="email" type="email" value="' +
      esc(s.email) +
      '"></div><div class="field"><label for="settingHours">Office hours</label><input id="settingHours" name="officeHours" value="' +
      esc(s.officeHours) +
      '"></div></div></section><section class="card settings-card"><h2>Service targets &amp; records</h2><p>Example configuration—confirm approved service standards and records schedules.</p><div class="form-grid"><div class="field"><label for="settingSla">Urgent report response target (hours)</label><input id="settingSla" name="urgentSla" type="number" min="1" value="' +
      esc(s.urgentSla) +
      '"><small>Target shown in the public services information is an urgent dispatch within 72 hours.</small></div><div class="field"><label for="settingRetention">Illustrative retention period (days)</label><input id="settingRetention" name="recordRetention" type="number" min="1" value="' +
      esc(s.recordRetention) +
      '"><small>Do not apply without an approved records retention schedule.</small></div></div></section><button class="button button-primary" type="submit">' +
      icon("check", 15) +
      'Save local settings</button></div><div><section class="card settings-card"><h2>Privacy &amp; access defaults</h2><p>Safeguards to carry into a secure production design.</p><div class="toggle-row"><input type="checkbox" id="maskReporter" name="maskReporter" ' +
      (s.maskReporter ? "checked" : "") +
      '><label for="maskReporter">Mask reporter identity in routine views<small>Only authorised officers should access identifying details when necessary.</small></label></div><div class="toggle-row"><input type="checkbox" id="requireMfa" name="requireMfa" ' +
      (s.requireMfa ? "checked" : "") +
      '><label for="requireMfa">Require multi-factor authentication<small>Important for staff accounts and sensitive records; not enforced in this static prototype.</small></label></div><div class="toggle-row"><input type="checkbox" id="auditAccess" name="auditAccess" ' +
      (s.auditAccess ? "checked" : "") +
      '><label for="auditAccess">Log access to confidential cases<small>Record view, export, update and assignment events in a protected audit service.</small></label></div><div class="toggle-row"><input type="checkbox" id="publicExports" name="publicExports" ' +
      (s.publicExports ? "checked" : "") +
      '><label for="publicExports">Allow public-facing exports<small>Keep disabled unless a data owner approves a de-identified publication.</small></label></div></section><section class="card settings-card"><h2>Prototype data</h2><p>Reset local changes to the original illustrative dataset.</p><div class="info-callout" style="margin-bottom:12px">' +
      icon("info", 15) +
      '<span>This does not affect the live Ministry website or any external records.</span></div><button class="button button-danger" type="button" data-action="confirm-reset">' +
      icon("refresh", 14) +
      "Reset demo workspace</button></section></div></div></form>"
    );
  };
})(window);
