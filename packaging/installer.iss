#define AppName "Longest Form AI Explainer Video Generator"
#define AppVersion "3.1.0"
#define AppPublisher "davidhorazaman-dev"
#define AppExeName "Free-Unlimited-Durations-AI-Video-Generator.exe"
[Setup]
AppId={{B2C3F8F5-8B13-4A10-A6B9-7F4E5F2A6C01}
AppName={#AppName}
AppVersion={#AppVersion}
AppPublisher={#AppPublisher}
DefaultDirName={autopf}\Longest-Form-AI-Explainer-Video-Generator
DefaultGroupName={#AppName}
OutputBaseFilename=Longest-Form-AI-Explainer-Video-Generator-Windows-Complete-Setup
Compression=lzma
SolidCompression=yes
ArchitecturesInstallIn64BitMode=x64compatible
WizardStyle=modern
[Files]
Source: "dist\Free-Unlimited-Durations-AI-Video-Generator.exe"; DestDir: "{app}"; Flags: ignoreversion
[Icons]
Name: "{group}\{#AppName}"; Filename: "{app}\{#AppExeName}"
Name: "{commondesktop}\{#AppName}"; Filename: "{app}\{#AppExeName}"
[Run]
Filename: "{app}\{#AppExeName}"; Description: "Launch {#AppName}"; Flags: nowait postinstall skipifsilent
