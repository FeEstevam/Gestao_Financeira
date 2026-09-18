import { useState } from "react";
import { Camera, Eye, EyeOff, Phone, Mail, User as UserIcon, CheckCircle2, Shield, Key } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/client/hooks/use-toast";
import { useLocalStorage } from "@/client/hooks/use-local-storage";
import { getSession, updateSessionUser } from "@/client/lib/auth";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/client/lib/utils";

interface ProfileData {
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ProfilePage() {
  const { toast } = useToast();
  const session = getSession();

  const [profile, setProfile] = useLocalStorage<ProfileData>("financaspro_profile", {
    username: session?.name ?? "Usuário Vault",
    email: session?.email ?? "usuario@cashflow.vault",
    phone: "+55 (11) 99999-0000",
    avatarUrl: session?.avatar_url ?? "",
  });

  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(profile);

  const initials = profile.username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "US";

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setProfile((prev) => ({ ...prev, avatarUrl: dataUrl }));
        setEditData((prev) => ({ ...prev, avatarUrl: dataUrl }));
        updateSessionUser({ avatar_url: dataUrl });
        toast({
          title: "Foto atualizada",
          description: "Sua identidade visual no cofre foi salva e sincronizada na barra de navegação.",
        });
      };
      reader.readAsDataURL(file);
    }
  }

  function startEditing() {
    setEditData(profile);
    setIsEditing(true);
  }

  function handleSave() {
    setProfile(editData);
    updateSessionUser({
      name: editData.username,
      email: editData.email,
      phone: editData.phone,
      avatar_url: editData.avatarUrl,
    });
    setIsEditing(false);
    toast({
      title: "Credenciais sincronizadas",
      description: "Suas informações de perfil foram armazenadas com criptografia.",
    });
  }

  return (
    <div className="w-full min-h-screen pb-20 sm:pb-10 font-sans tracking-tight bg-[#08080a] relative overflow-hidden text-[#e8e6e3]">

      {/* ═══ Ambient Glow / Noise ═══ */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(204,145,102,0.06)_0%,transparent_50%)] pointer-events-none z-0" />
      <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#cc9166]/[0.03] rounded-full blur-[150px] pointer-events-none z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[840px] mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8 relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1c1d22] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#cc9166] uppercase">
              <Shield className="w-3.5 h-3.5" />
              <span>Identity & Security</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-display font-light tracking-tight text-[#f5f4f0]">
              Identidade do Titular<span className="text-[#cc9166]">.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#8a8880] font-sans">
              Gerenciamento seguro de chaves de acesso, credenciais e dados pessoais.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#121317] border border-[#1c1d22] text-[#8a8880] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              Sessão Criptografada
            </span>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div variants={itemVariants} className="relative rounded-2xl overflow-hidden border border-[#1c1d22] bg-[#040406] shadow-2xl p-6 sm:p-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">

            {/* Avatar Column */}
            <div className="flex flex-col items-center gap-4 shrink-0 relative">
              <div className="relative group/avatar">
                <Avatar className="h-28 w-28 sm:h-32 sm:w-32 rounded-2xl border-2 border-[#1c1d22] shadow-[0_0_30px_rgba(0,0,0,0.8)] bg-[#121317]">
                  <AvatarImage src={profile.avatarUrl} alt={profile.username} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-[#1c1d22] to-[#0c0d10] text-[#cc9166] text-3xl font-serif-display font-light">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-2 -right-2 p-2.5 rounded-xl bg-[#cc9166] hover:bg-[#d99f75] text-[#08080a] cursor-pointer shadow-lg hover:scale-105 transition-all border border-[#08080a]"
                  title="Alterar foto de perfil"
                >
                  <Camera className="h-4 w-4 stroke-[2.5]" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              <div className="text-center md:hidden">
                <h2 className="text-xl font-serif-display text-[#f5f4f0]">{profile.username}</h2>
                <p className="text-xs font-mono text-[#8a8880]">{profile.email}</p>
              </div>

              <div className="w-full text-center hidden md:block pt-2">
                <span className="text-[10px] font-mono text-[#6b6960] uppercase tracking-wider block">ID do Cofre</span>
                <span className="text-[11px] font-mono text-[#8a8880]">0x9A...F48E</span>
              </div>
            </div>

            {/* Info Column */}
            <div className="flex-1 w-full space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#1c1d22]">
                <div>
                  <h3 className="text-base font-medium text-[#f5f4f0]">Informações de Registro</h3>
                  <p className="text-xs text-[#6b6960]">Dados associados à custódia do cofre</p>
                </div>

                <AnimatePresence mode="wait">
                  {!isEditing ? (
                    <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Button
                        variant="outline"
                        onClick={startEditing}
                        className="bg-[#121317] hover:bg-[#1c1d22] text-[#f5f4f0] hover:text-white rounded-xl text-xs font-medium border-[#1c1d22] transition-colors"
                      >
                        Editar Credenciais
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => setIsEditing(false)}
                        className="bg-transparent hover:bg-rose-500/10 text-[#8a8880] hover:text-rose-400 rounded-xl text-xs border border-[#1c1d22] transition-colors"
                      >
                        Cancelar
                      </Button>
                      <Button
                        onClick={handleSave}
                        className="bg-[#ffffff] hover:bg-[#f5f4f0] text-[#08080a] rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-lg"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Salvar
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Username */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[#8a8880] text-[10px] font-mono uppercase tracking-wider">
                    <UserIcon className="h-3 w-3 text-[#cc9166]" /> Nome do Titular
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editData.username}
                      onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                      className="h-11 bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] rounded-xl text-sm font-sans"
                    />
                  ) : (
                    <div className="h-11 flex items-center px-3.5 bg-[#121317]/50 border border-[#1c1d22] rounded-xl text-[#f5f4f0] text-sm">
                      {profile.username}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[#8a8880] text-[10px] font-mono uppercase tracking-wider">
                    <Mail className="h-3 w-3 text-[#cc9166]" /> E-mail Primário
                  </Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="h-11 bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] rounded-xl text-sm font-sans"
                    />
                  ) : (
                    <div className="h-11 flex items-center px-3.5 bg-[#121317]/50 border border-[#1c1d22] rounded-xl text-[#f5f4f0] text-sm font-mono">
                      {profile.email}
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[#8a8880] text-[10px] font-mono uppercase tracking-wider">
                    <Phone className="h-3 w-3 text-[#cc9166]" /> Telefone / WhatsApp
                  </Label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="h-11 bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0] rounded-xl text-sm font-sans"
                    />
                  ) : (
                    <div className="h-11 flex items-center px-3.5 bg-[#121317]/50 border border-[#1c1d22] rounded-xl text-[#f5f4f0] text-sm font-mono">
                      {profile.phone}
                    </div>
                  )}
                </div>

                {/* Password Placeholder */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-[#8a8880] text-[10px] font-mono uppercase tracking-wider">
                    <Key className="h-3 w-3 text-[#cc9166]" /> Chave Mestra
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      readOnly={!isEditing}
                      onChange={(e) => isEditing && setPassword(e.target.value)}
                      className={cn(
                        "h-11 px-3.5 rounded-xl font-mono text-sm pr-10",
                        isEditing
                          ? "bg-[#121317] border-[#1c1d22] focus:border-[#cc9166] text-[#f5f4f0]"
                          : "bg-[#121317]/50 border-[#1c1d22] text-[#8a8880] pointer-events-none"
                      )}
                    />
                    <button
                      type="button"
                      className={cn(
                        "absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors",
                        isEditing ? "text-[#8a8880] hover:text-[#f5f4f0]" : "text-[#6b6960] hover:text-[#8a8880] pointer-events-auto"
                      )}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security & Activity Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#040406] border border-[#1c1d22] space-y-1.5">
            <span className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">Status do Vault</span>
            <div className="text-lg font-serif-display text-[#34d399] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
              100% Protegido
            </div>
            <p className="text-[11px] text-[#6b6960]">Criptografia local AES-GCM ativada</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#040406] border border-[#1c1d22] space-y-1.5">
            <span className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">Última Sincronização</span>
            <div className="text-lg font-mono text-[#f5f4f0]">Hoje, há 2 min</div>
            <p className="text-[11px] text-[#6b6960]">Ledger atualizado no navegador</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#040406] border border-[#1c1d22] space-y-1.5">
            <span className="text-[10px] font-mono text-[#8a8880] uppercase tracking-wider">Nível de Assinatura</span>
            <div className="text-lg font-serif-display text-[#cc9166]">Slash Pro Vault</div>
            <p className="text-[11px] text-[#6b6960]">Acesso irrestrito a todas as ferramentas</p>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
