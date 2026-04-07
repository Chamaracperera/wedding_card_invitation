import { useMemo, useState } from "react";

export default function AdminPanel() {
  const [title, setTitle] = useState("both");
  const [name, setName] = useState("");

  const baseUrl = `${window.location.origin}/`;

  // 🔥 Build name automatically
  const finalName = useMemo(() => {
    const cleanName = name.trim() || "Dissanayake";

    switch (title) {
      case "mr":
        return `Mr ${cleanName}`;
      case "mrs":
        return `Mrs ${cleanName}`;
      case "family":
        return `Family ${cleanName}`;
      default:
        return `Mr & Mrs ${cleanName}`;
    }
  }, [title, name]);

  const inviteLink = useMemo(() => {
    return `${baseUrl}?name=${encodeURIComponent(finalName)}`;
  }, [baseUrl, finalName]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      alert("Link copied!");
    } catch {
      alert("Copy failed");
    }
  };

  const openInvite = () => {
    window.open(inviteLink, "_blank");
  };

  const openWhatsapp = () => {
    const text = `Dear ${finalName}, you are warmly invited to our wedding. Please open your invitation here: ${inviteLink}`;
    const waLink = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waLink, "_blank");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <h2>Wedding Invite Admin</h2>

        {/* 🔹 Title Selection */}
        <label>Title</label>
        <select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        >
          <option value="both">Mr & Mrs</option>
          <option value="mr">Mr</option>
          <option value="mrs">Mrs</option>
          <option value="family">Family</option>
        </select>

        {/* 🔹 Name Input */}
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Perera"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        />

        {/* 🔹 Output */}
        <div style={{ marginBottom: "10px" }}>
          <strong>Generated Name:</strong> {finalName}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Link:</strong>
          <div style={{ wordBreak: "break-all" }}>{inviteLink}</div>
        </div>

        {/* 🔹 Buttons */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={copyLink}>Copy Link</button>
          <button onClick={openInvite}>Preview</button>
          <button onClick={openWhatsapp}>WhatsApp</button>
        </div>
      </div>
    </div>
  );
}