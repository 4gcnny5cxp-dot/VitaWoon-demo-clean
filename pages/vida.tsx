export default function Vida() {
  return (
    <main>
      <div className="container">
        <h1>Vida</h1>
        <p className="muted" style={{ maxWidth: 900, lineHeight: 1.7 }}>
          Vida is het gezicht van het vaste begeleidteam van VitaWoon. Wij denken onafhankelijk met u mee bij uw volgende woonstap.
          U kunt een snelle vraag stellen, of kiezen voor persoonlijk contact.
        </p>

        <div className="card" style={{ marginTop: 14 }}>
          <h3>💬 Snelle vraag</h3>
          <p className="muted" style={{ lineHeight: 1.6 }}>
            Voor korte vragen zoals “hoe werkt de wachtlijst?” of “wat bedoelen jullie met ondersteuning binnen bereik?”.
          </p>
          <p className="muted" style={{ fontSize: 13 }}>
            (Demo) Hier komt straks de chatmodule. Voor nu kun je dit later koppelen aan een chatwidget.
          </p>
        </div>

        <div className="card" id="meekijken" style={{ marginTop: 14 }}>
          <h3>📩 Laat ons met u meekijken</h3>
          <p className="muted" style={{ lineHeight: 1.6 }}>
            Wilt u dat we met u meekijken naar uw situatie? Laat kort uw vraag achter — het Vida-team neemt contact op.
          </p>

          <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
            <input placeholder="Naam" style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }} />
            <input placeholder="E-mail" style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }} />
            <input placeholder="Telefoon (optioneel)" style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd" }} />
            <textarea placeholder="Uw vraag" style={{ padding: "10px 12px", borderRadius: 12, border: "1px solid #ddd", minHeight: 110 }} />
            <button className="btn btnPrimary" style={{ cursor: "pointer" }}>Verstuur (demo)</button>
          </div>
        </div>

        <div className="card" id="bellen" style={{ marginTop: 14 }}>
          <h3>📞 Plan een belmoment</h3>
          <p className="muted" style={{ lineHeight: 1.6 }}>
            Wilt u uw situatie persoonlijk bespreken? Plan een moment dat u uitkomt. Vida of één van het vaste team neemt de tijd voor u.
          </p>
          <p className="muted" style={{ fontSize: 13 }}>
            (Demo) Hier kun je later een Calendly-link of belafspraak-module koppelen.
          </p>
        </div>

        <p style={{ marginTop: 24 }}>
          <a href="/" style={{ textDecoration: "underline" }}>← Terug</a>
        </p>
      </div>
    </main>
  );
}
