import os
import shutil
import typer
from pathlib import Path
from datetime import datetime, timezone

from config import ext_to_folder, log_extensions, max_log_age_days

app = typer.Typer(help="Sys maint: Log Cleaner and File Sorter")


@app.command()
def clean_logs(
    target_dir: Path = typer.Argument(
        ...,
        help="Ruta del directorio a limpiar",
        exists=True,
        file_okay=False,
        dir_okay=True,
        resolve_path=True,
    ),
    days: int = typer.Option(
        max_log_age_days,
        "--days", "-d",
        help="Eliminar archivos más viejos que N días"
    ),
    dry_run: bool = typer.Option(False, "--dry-run", help="Ver qué se eliminaría sin borrar nada"),
):
    """Elimina archivos de log/temp según extensión y antigüedad."""
    typer.secho(f"Limpiando logs en: {target_dir}", fg=typer.colors.CYAN)

    now = datetime.now(timezone.utc)
    deleted = 0

    for file in target_dir.rglob("*"):
        if not file.is_file():
            continue
        if file.suffix.lower() not in log_extensions:
            continue

        age_days = (now - datetime.fromtimestamp(file.stat().st_mtime, tz=timezone.utc)).days

        if age_days >= days:
            if dry_run:
                typer.echo(f"  [dry-run] Borraría: {file}  ({age_days}d)")
            else:
                file.unlink()
                typer.echo(f"  Eliminado: {file}  ({age_days}d)")
                deleted += 1

    if dry_run:
        typer.secho("Modo dry-run, no se borró nada.", fg=typer.colors.YELLOW)
    else:
        typer.secho(f"Listo. {deleted} archivo(s) eliminado(s).", fg=typer.colors.GREEN)


@app.command()
def file_sorter(
    target_dir: Path = typer.Argument(
        ...,
        help="Ruta del directorio a ordenar",
        exists=True,
        file_okay=False,
        dir_okay=True,
        resolve_path=True,
    ),
    dry_run: bool = typer.Option(False, "--dry-run", help="Ver qué se movería sin mover nada"),
):
    """Ordena los archivos del directorio en subcarpetas según su extensión."""
    typer.secho(f"Ordenando archivos en: {target_dir}", fg=typer.colors.CYAN)

    moved = 0
    skipped = 0

    for file in target_dir.iterdir():
        if not file.is_file():
            continue

        ext = file.suffix.lower()
        folder_name = ext_to_folder.get(ext, "Others")
        dest_folder = target_dir / folder_name
        dest = dest_folder / file.name

        if dry_run:
            typer.echo(f"  [dry-run] {file.name}  →  {folder_name}/")
            moved += 1
            continue

        dest_folder.mkdir(exist_ok=True)

        if dest.exists():
            typer.secho(f"  Omitido (ya existe): {file.name}", fg=typer.colors.YELLOW)
            skipped += 1
            continue

        shutil.move(str(file), str(dest))
        typer.echo(f"  {file.name}  →  {folder_name}/")
        moved += 1

    label = "movería" if dry_run else "movido(s)"
    typer.secho(f"Listo. {moved} archivo(s) {label}, {skipped} omitido(s).", fg=typer.colors.GREEN)


if __name__ == "__main__":
    app()