import { useState } from 'react';

export default function Settings() {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <div className="page-title">
        <div>
          <h1>Settings</h1>
          <p className="muted">Store profile and notification preferences.</p>
        </div>
      </div>
      <form
        className="card form"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        <label>
          Store name
          <input defaultValue="ShopPulse NG" />
        </label>
        <label>
          Support email
          <input type="email" defaultValue="support@example.com" />
        </label>
        <label>
          Currency
          <select defaultValue="NGN">
            <option value="NGN">Nigerian Naira (₦)</option>
            <option value="USD">US Dollar ($)</option>
          </select>
        </label>
        <label className="check">
          <input type="checkbox" defaultChecked /> Email me when stock is low
        </label>
        <button className="btn" type="submit">
          Save changes
        </button>
        {saved && <p role="status" className="saved">Settings saved (demo only).</p>}
      </form>
    </>
  );
}
