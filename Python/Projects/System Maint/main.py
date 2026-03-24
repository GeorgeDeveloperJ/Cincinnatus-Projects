import typer
from pathlib import Path

app = typer.Typer(help="Sys maint: Log Cleaner and File Sorter")

def target(message: str):
    
    return target_dir

@app.command()
def clean_logs(
    target_dir: Path = typer.Argument(
        ..., 
        help="Ruta absoluta o relativa del directorio a limpiar",
        exists=True,       # Falla automáticamente si la ruta no existe
        file_okay=False,   # Falla si el usuario pasa un archivo en vez de una carpeta
        dir_okay=True,     # Exige que sea un directorio
        resolve_path=True  # Resuelve rutas relativas (ej. "./logs") a absolutas
    )
):

    """ Logs cleaner based on the rules of the user """
    typer.secho(f"Starting the cleaning on {target_dir}", fg=typer.colors.CYAN)

@app.command()
def file_sorter(
    target_dir: Path = typer.Argument(
    ..., 
        help="Ruta del directorio a ordenar",
        exists=True, file_okay=False, dir_okay=True, resolve_path=True    
    )
):
    """ Sort the files of the objective directory """
    typer.secho(f"Sorting files in {target_dir}...", fg=typer.colors.CYAN)

if __name__ == "__main__":
    app()