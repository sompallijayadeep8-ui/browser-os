export function createSettings() {

   const settings = document.createElement("div");

settings.className = "settings-app";

settings.innerHTML = `

<div class="settings-item active">
    🎨 Appearance
</div>

<div class="settings-item">
    🖼 Wallpaper
</div>

<div class="settings-item">
    🌙 Theme
</div>

<div class="settings-item">
    🎯 Accent Color
</div>

<div class="settings-item">
    ℹ About
</div>

<h2>Appearance</h2>

<div class="settings-panel">

</div>

`;

return settings;

   


}