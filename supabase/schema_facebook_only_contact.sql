-- Cat TNR Fehérvár — csak Facebook mint kapcsolattartási lehetőség (5. kör)
--
-- HASZNÁLAT: Supabase dashboard -> SQL Editor -> New query -> illeszd be ezt a
-- teljes fájlt -> Run. Ez a korábbi supabase/schema*.sql fájlok UTÁN
-- futtatandó (azokat már lefuttattad).
--
-- Ez a fájl:
--   1. Beállítja a valós Facebook oldal linket (a korábbi PLACEHOLDER helyett)
--      mindenhol, ahol a content_blocks táblában szerepel.
--   2. Törli az Instagram és e-mail content_blocks sorokat — ezek mostantól
--      sehol nem jelennek meg publikusan, a kapcsolattartás kizárólag
--      Facebookon keresztül történik.
--   3. Frissíti a "Megosztás / közösségi média" kártya linkjét is (Segíts
--      oldal alján) ugyanerre a Facebook linkre.
--
-- FONTOS: a site.email content_blocks kulcs törlése NEM érinti az űrlap-
-- értesítéseket (pl. amikor valaki kitölti a kapcsolatfelvételi űrlapot) —
-- azok külön, a RESEND_TO_EMAIL környezeti változó / kódban lévő alapérték
-- alapján mennek, nem ebből a táblából.

update public.content_blocks
  set value = 'https://www.facebook.com/cattnrfehervar/directory_contact_info'
  where key = 'site.facebook_url';

delete from public.content_blocks where key in ('site.instagram_url', 'site.email');

update public.help_categories
  set button_url = 'https://www.facebook.com/cattnrfehervar/directory_contact_info'
  where title = 'Megosztás / közösségi média';
